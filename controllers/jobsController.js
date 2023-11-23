import jobsModel from "../models/jobsModel.js";


//=======CREATE JOB========
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next('Please provid All fields')
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job });
}


//====== GET JOBS ======
export const getAlljobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs: jobs.length,
        jobs,
    });

};

//======= UPDATE JOBS ========
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    //validation
    if (!company || !position) {
        next('Please provide all Fields')
    }
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`no jobs found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('Your not Authorized to update this job')
        return
    }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    //response
    res.status(200).json({ updateJob });

};

//========DELETE JOB ==========
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`No job found with this Id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next('Your not Authorized to deletek this job')
        return
    }
    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted!" })
}

