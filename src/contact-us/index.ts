const telInput = document.querySelector("#phone");
const submit = document.getElementById("submit");
const iti = window.intlTelInput(telInput, {
  // any initialisation options go here
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.min.js",
  preferredCountries: ["US"],
  nationalMode: false,
  formatOnDisplay: true, // SET THIS!!!
});

telInput.addEventListener("keyup", formatIntlTelInput);
telInput.addEventListener("change", formatIntlTelInput);

function formatIntlTelInput() {
  if (typeof intlTelInputUtils !== "undefined") {
    // utils are lazy loaded, so must check
    var currentText = iti.getNumber(intlTelInputUtils.numberFormat.E164);
    if (typeof currentText === "string") {
      // sometimes the currentText is an object :)
      iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
    }
  }
}

/** File Upload **/
(function ($, window, document, undefined) {
  // feature detection for drag&drop upload

  const _files = [];
  var isAdvancedUpload = (function () {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  const appendFileThumbnail = (file, appendTo) => {
    _files.push(file);
    const newFile = document.createElement("img");

    const contentSpan = document.createElement("span");
    const newContent = document.createTextNode(file.name);
    contentSpan.append(newContent);

    const thumbnail = document.createElement("div");
    let classList = "thumbnail";
    if (file.type.includes("pdf")) {
      classList += " pdf";
      newFile.src = "https://centerline-inc.s3.us-west-1.amazonaws.com/dist/static/pdf-icon.png";
    } else {
      const src = URL.createObjectURL(file);
      newFile.src = src;
    }
    thumbnail.classList = classList;

    thumbnail.append(contentSpan);
    thumbnail.append(newFile);

    appendTo.append(thumbnail);
  };

  const $form = $("#centerline-form"),
    $input = $form.find('input[type="file"]'),
    $label = $form.find(".file__label"),
    $errorMsg = $form.find(".box__error span"),
    $restart = $form.find(".box__restart"),
    $errorBox = $form.find(".error-box"),
    $box = $form.find(".box");

  let droppedFiles = false;

  const showFiles = function (files) {
    // console.log("files", files);
    _files.length === 0 && $label.html("");
    Array.from(files).forEach((file) => appendFileThumbnail(file, $label));
    // $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name);
  };

  const showError = (name) => {
    $errorBox.addClass(`${name}`);
  };

  $form.on("change", () => {
    $errorBox.removeClass("required");
  });

  $input.on("change", function (e) {
    showFiles(e.target.files);
  });

  // drag&drop files if the feature is available
  if (isAdvancedUpload) {
    $box
      .addClass("has-advanced-upload") // letting the CSS part to know drag&drop is supported by the browser
      .on("drag dragstart dragend dragover dragenter dragleave drop", function (e) {
        // preventing the unwanted behaviours
        e.preventDefault();
        e.stopPropagation();
      })
      .on("dragover dragenter", function () //
      {
        $box.addClass("is-dragover");
      })
      .on("dragleave dragend drop", function () {
        $box.removeClass("is-dragover");
      })
      .on("drop", function (e) {
        droppedFiles = e.originalEvent.dataTransfer.files; // the files that were dropped
        showFiles(droppedFiles);
      });
  }

  $restart.on("click", function (e) {
    e.preventDefault();
    $box.removeClass("is-error is-success");
    $input.trigger("click");
    _files.splice(0, _files.length);
  });

  $input
    .on("focus", function () {
      $input.addClass("has-focus");
    })
    .on("blur", function () {
      $input.removeClass("has-focus");
    });

  const submitResponse = document.querySelector("#response");
  const formURL = "https://8c4b8geecl.execute-api.us-west-1.amazonaws.com/Prod/CenterLineFormSubmission";

  $form.on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData($form.get(0));

    if (
      !formData.get("name") ||
      !formData.get("message") ||
      !formData.get("email") ||
      !formData.get("phone") ||
      !formData.get("reason")
    ) {
      showError("required");
      return;
    }

    if (droppedFiles) {
      if (droppedFiles)
        $.each(droppedFiles, function (i, file) {
          formData.set($input.attr("name"), file);
        });
    }

    console.log("Sending: ", formData.get("files[]"));

    $.ajax({
      url: formURL,
      type: "post",
      data: formData,
      dataType: "json",
      cache: false,
      contentType: false,
      processData: false,
      complete: function () {
        $box.removeClass("is-uploading");
      },
      success: function (data) {
        $box.addClass(data.success == true ? "is-success" : "is-error");
        if (!data.success) $errorMsg.text(data.error);
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });
})(jQuery, window, document);
