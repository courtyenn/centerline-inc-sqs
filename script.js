var node = document.createElement("div");
node.className = "banner";

var phone1 = document.createElement("a");
phone1.href = "tel:5807625451";
phone1.innerHTML = "+1 (580) 762-5451";

var phoneIcon = document.createElement("span");
phoneIcon.className = "icon-phone";

var contact = document.createElement("div");
contact.className = "contact";
contact.prepend(phone1);
contact.prepend(phoneIcon);
contact.prepend(phone1);
contact.prepend(phoneIcon);

var social = document.createElement("div");
social.className = "social";

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

/*
function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
}
*/
