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