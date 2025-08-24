const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Enquiry = require("./enquiry-model");
const sendResponse = require("../../middleware/response");
const ErrorHandler = require("../../utils/ErrorHandler");


exports.createEnquiry = catchAsyncErrors(async (req, res, next) => {
    try {

        // Create the new enquiry
        const newEnquiry = await Enquiry.create({
            course: req.body?.course,
            name: req.body?.name,
            phone: req.body?.phone,
            email: req.body?.email,
            address: req.body?.address
        });
        

        sendResponse(res, 200, "Enquiry submitted successfully.", newEnquiry);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.getAllEnquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const enquiry = await Enquiry.find(); // Simple fetch query

        if (enquiry.length === 0) {
            return next(new ErrorHandler("Enquiry Not Exist", 400));
        }

        sendResponse(res, 200, "Enquiry data fetched successfully.", {
            enquiry
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.deleteEnquiryByID = catchAsyncErrors(async (req, res, next) => {

    try {
        const enquiryID = req.params.id;
        const enquiryData = await Enquiry.findById(enquiryID);

        if (!enquiryData) {
            return next(new ErrorHandler("Enquiry Not Exist", 400));
        }
        // Delete the enquiry first
        const deletedEnquiry = await Enquiry.deleteOne({ _id: enquiryID });

        sendResponse(res, 200, "Enquiry deleted successfully", deletedEnquiry);

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }

})



exports.deleteAllEnquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        const deletedEnquiries = await Enquiry.deleteMany({}); // Deletes all documents

        sendResponse(res, 200, "All enquiries deleted successfully", deletedEnquiries);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});





