/**
* Adobe View
*/
document.addEventListener("adobe_dc_view_sdk.ready", function()
{
    const adobeDCView = new AdobeDC.View({clientId: "1900c81d5da546a999b6a4aa772049fd", divId: "adobe-dc-view"});
    adobeDCView.previewFile(
    {
      content: {location: {url: "https://centerline-inc.s3.us-west-1.amazonaws.com/spindle_repair_information.pdf"}},
      metaData: {fileName: "SpindleRepairIntakeForm.pdf"}
    });
});