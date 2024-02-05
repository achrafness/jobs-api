const Job = require("../models/Job")
const { BadRequestError, NotFoundError } = require("../errors")
const { StatusCodes } = require("http-status-codes")

const getAllJobs = async (req, res) => {
    const { search, status, jobType, sort } = req.query;
  
    // protected route
    const queryObject = {
      createdBy: req.user.userId,
    };
  
    if (search) {
      queryObject.position = { $regex: search, $options: 'i' };
    }
    // add stuff based on condition
  
    if (status && status !== 'all') {
      queryObject.status = status;
    }
    if (jobType && jobType !== 'all') {
      queryObject.jobType = jobType;
    }
  
    // NO AWAIT
  
    let result = Job.find(queryObject);
  
    // chain sort conditions
  
    if (sort === 'latest') {
      result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
      result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
      result = result.sort('position');
    }
    if (sort === 'z-a') {
      result = result.sort('-position');
    }
  
    //
  
    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit);
  
    const jobs = await result;
  
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);
  
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
  };
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}
const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId,
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req
    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req
    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId,
    })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}