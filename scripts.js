function isLoaded(status, element) {
  if(status) {
    $(element).wrap('<div class="loader"></div>');
  } else {
    $(element).unwrap();
  }
}

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

function popularVideoLoader(item, i, element) {
  let active = ""
  if (!i) {
    active = "active";
  }

  let stars = '';

  for (let i = 0; i < item.star; i++) {
    stars += '<img src="images/star_on.png" width="15" height="15" alt="Star on">';
  }
  for (let j = 0; j < (5 - item.star); j++) {
    stars += '<img src="images/star_off.png" width="15" height="15" alt="Star off">';
  }

  $(element).append(`
  <div class="carousel-item ${active}" id="carousel-video">
  <div class="row justify-content-center">
  <div class="col-md-3">
    <div class="card mb-2 video-card">
      <img class="card-img-top" src="${item.thumb_url}"
        alt="Card image cap">
      <img class="play-button" src="images/play.png" alt="Play" width="64" height="64">
      <div class="card-body">
        <h4 class="card-title font-weight-bold">${item.title}</h4>
        <p class="card-text">${item["sub-title"]}</p>
        <div class="row justify-content-start fontsize-14 carousel-purple">
          <div class="col-2">
            <img class="rounded-circle" src="${item.author_pic_url}" width="30" height="30" alt="Profile 4">
          </div>
          <div class="col mt-1">${item.author}</div>
        </div>
        <div class="row justify-content-between mt-2">
          <div class="col">
            ${stars}
          </div>
          <div class="col-4 text-right carousel-purple">${item.duration}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  `)

}
function getLastestVideos() {
  $.ajax({
    url: "https://smileschool-api.hbtn.info/latest-videos",
    method: "GET",
    contentType: "application/json",
    beforeSend: isLoaded(true, "#carousel-latest-video"),
    success: function(result) {
      console.log("Bye")
      $("#carousel-latest-video").empty();
      isLoaded(false, "#carousel-latest-video"),
      result.forEach((item, i) => {
        console.log("hello");
        popularVideoLoader(item, i, "#carousel-latest-video");
    });
  }
});
}

function getPopularVideos() {
      $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        contentType: "application/json",
        beforeSend: isLoaded(true, "#carousel-video"),
        success: function(result) {
          $("#carousel-video").empty();
          isLoaded(false, "#carousel-video"),
          result.forEach((item, i) => {
            popularVideoLoader(item, i, "#carousel-video");
        });
      }
  });
}

function getCarouselData() {
      $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        method: "GET",
        contentType: "application/json",
        beforeSend: isLoaded(true, "#inner-carousel"),
        success: function(result) {
          $("#inner-carousel").empty();
          isLoaded(false, "#inner-carousel"),
          result.forEach((item, i) => {
            carouselLoader(item, i);
        });
      }
  });
}

$(document).ready(function() {
  getCarouselData();
  getPopularVideos();
  getLastestVideos();
})
