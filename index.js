/**
 * HEAD

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/intlTelInput.min.js" integrity="sha512-Po9nSdYOcWIcoADdRjkAbRYPpR8OHjxzA/3RDUERZcDewTLzRTxbG4bUX7Sr7lVEcO3wTCzphdOBWgNFKVmxaA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/css/intlTelInput.css" integrity="sha512-gxWow8Mo6q6pLa1XH/CcH8JyiSDEtiwJV78E+D+QP0EVasFs8wKXq16G8CLD4CJ2SnonHr4Lm/yY2fSI2+cbmw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

*/

/**
 * This goes in the FOOTER I think
<script src="https://documentcloud.adobe.com/view-sdk/main.js"></script>

<script type="text/javascript">
*/
/**
* Adobe View
*/
    document.addEventListener("adobe_dc_view_sdk.ready", function()
    {
        var adobeDCView = new AdobeDC.View({clientId: "<YOUR_CLIENT_ID>", divId: "adobe-dc-view"});
        adobeDCView.previewFile(
       {
          content:   {location: {url: "http://www.pubs.centerline-inc.com/centerline/spindle_repair_information.pdf"}},
          metaData: {fileName: "Bodea Brochure.pdf"}
       });
    });

/**
* Social Media Banner XD
*/
function detectMob() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}
var node = document.createElement('div');
node.className = 'banner';

var phone1 = document.createElement("a");
phone1.href = "tel:580-762-5451";
phone1.innerHTML = "+1 (580) 762-5451";

var phone2 = document.createElement("a");
phone2.href = "tel:1-800-696-2865";
phone2.innerHTML = "Toll-free: +1(800) 696-2865";

var phoneIcon = document.createElement("span");
phoneIcon.className = "icon-phone";

var email = document.createElement("a");
email.href = "mailto:info@centerline-inc.com";
email.innerHTML = "info@centerline-inc.com";

var mailIcon = document.createElement("span");
mailIcon.className = "icon-mail-alt";

var contact = document.createElement("div");
contact.className = "contact";
contact.prepend(email);
contact.prepend(mailIcon);
contact.prepend(phone2);
contact.prepend(phoneIcon);
contact.prepend(phone1);
contact.prepend(phoneIcon.cloneNode());

var social = document.createElement('div');
social.className = 'social';

social.innerHTML = `
<a href="https://www.facebook.com/CenterlineInc/" target="_blank" class="sqs-svg-icon--wrapper facebook-unauth" aria-label="Facebook">
  <div>
    <svg class="sqs-svg-icon--social" viewBox="0 0 64 64">
      <use class="sqs-use--icon" xlink:href="#facebook-unauth-icon"></use>
      <use class="sqs-use--mask" xlink:href="#facebook-unauth-mask"></use>
    </svg>
  </div>
</a>
<a href="https://twitter.com/SpindleRepair" target="_blank" class="sqs-svg-icon--wrapper twitter-unauth" aria-label="Twitter">
  <div>
    <svg class="sqs-svg-icon--social" viewBox="0 0 64 64">
      <use class="sqs-use--icon" xlink:href="#twitter-unauth-icon"></use>
      <use class="sqs-use--mask" xlink:href="#twitter-unauth-mask"></use>
    </svg>
  </div>
</a>
<a href="https://www.youtube.com/user/spindlerepair" target="_blank" class="sqs-svg-icon--wrapper youtube-unauth" aria-label="YouTube">
  <div>
    <svg class="sqs-svg-icon--social" viewBox="0 0 64 64">
      <use class="sqs-use--icon" xlink:href="#youtube-unauth-icon"></use>
      <use class="sqs-use--mask" xlink:href="#youtube-unauth-mask"></use>
    </svg>
  </div>
</a>
`;

if (!detectMob()) {
  node.prepend(contact);
  node.appendChild(social);
  document.body.prepend(node);
  document.addEventListener("scroll", () => {
    if (window.scrollY !== 0) {
      node.className = "banner show";
    } else {
      node.className = "banner";
    }
  });
}
// </script>