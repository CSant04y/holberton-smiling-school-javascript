function carouselLoader(item, i) {
    // It uses the Ids to place corresponing data in its place
    let active = ""
    if (!i) {
      active = "active";
    }
    $("#inner-carousel").append(`
    <div class="carousel-item ${active} px-5">
    <div class="row d-flex justify-content-center align-items-center flex-md-row flex-column">
      <div class="col-12 col-sm-4 col-md-4 col-lg-3 d-flex justify-content-sm-end justify-content-center ">
        <img src="${item.pic_url}" class="rounded-circle carousel-img" id="carousel-img-1" alt="...">
      </div>
      <div class="col pr-5 mr-4 pt-5 pt-sm-0">
        <p class="font-italic" id="text_1"> «${item.text}</p>
        <h6 class="font-weight-bold m-0 mb-1" id="person_1">${item.name}</h6>
        <p class="font-italic m-0" id="title_1">${item.title}</p>
      </div>
    </div>
  </div>`);
}

function isLoaded(status, item) {
  if(status) {
    $(item).wrap('<div class="loader"></div>');
  } else {
    $(item).unwrap();
  }

}

function getCarouselData() {
    var settings = {
        "url": "https://smileschool-api.hbtn.info/quotes",
        "method": "GET",
        "content-type": "application/json",
        "beforeSend": isLoaded(true),
        "success": function(result) {
          $("#inner-carousel").empty();
          isLoaded(false, "#inner-carousel");
          result.forEach((item, i) => {
            carouselLoader(item, i);
          });
        },
      };
      
      $.ajax(settings).done(function (response) {
        let response1 = response[0];
        let response2 = response[1];
        carouselLoader(response1, "#inner-carousel");
      });
}

$(document).ready(function() {
  getCarouselData();
})