/** File Upload **/
(function ($, window, document) {
  // feature detection for drag&drop upload

  const _files: File[] = [];
  var isAdvancedUpload = (function () {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  const appendFileThumbnail = (file: File, appendTo) => {
    _files.push(file);
    const newFile = document.createElement("img");
    const src = URL.createObjectURL(file);
    newFile.src = src;

    const contentSpan = document.createElement("span");
    const newContent = document.createTextNode(file.name);
    contentSpan.append(newContent);

    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";

    thumbnail.append(contentSpan);
    thumbnail.append(newFile);

    appendTo.append(thumbnail);
  };

  const $form = $("#centerline-form"),
    $input = $form.find('input[type="file"]'),
    $label = $form.find(".file__label"),
    $errorMsg = $form.find(".box__error span"),
    $restart = $form.find(".box__restart"),
    $box = $form.find(".box");

  let droppedFiles = false;

  const showFiles = function (files) {
    console.log("files", files);
    _files.length === 0 && $label.html("");
    files.forEach((file) => appendFileThumbnail(file, $label));
  };

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
  const formURL = "http://localhost:3000/upload";

  $form.on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData($form.get(0));

    if (droppedFiles) {
      $.each(droppedFiles, function (i, file) {
        formData.append($input.attr("name"), file);
      });
    }

    console.log("Sending: ", formData);

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
