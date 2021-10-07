function getDropDownMenu() {
    let url = "https://smileschool-api.hbtn.info/courses"
    $.get(url, data => {
      const {
        topics
      } = data;
      let topicsDropDown = '';
  
      for (let i = 0; i < topics.length; i++) {
        topicsDropDown = `<option class="dropdown-item" value="${i + 1}"x>${topics[i]}</option>`;
        $("#topics-dropdown").append(topicsDropDown);
      }
  
      const {
        sorts
      } = data;
      let sortsDropdown = '';
  
      for (let j = 0; j < sorts.length; j++) {
        sortsDropDown = `<option class="dropdown-item" value="${j + 1}">${sorts[j].replace(/[_-]/g, " ")}</option>`;
        $("#sorts-dropdown").append(sortsDropDown);
        console.log("Whats up?")
      }
  
    });
  }
  
  const sortBy = value => {
    console.log("bitch")
    $("#num-videos").text("12 videos")
    const url = "https://smileschool-api.hbtn.info/courses";
  
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      contentType: "application/json",
      beforeSend: isLoaded(true, ".card-container"),
      success: function(data) {
        $(".card-container").empty();
        isLoaded(false, ".card-container");
        const {
          courses
        } = data;

        // Sort by most popular
        if (value === "1") {}
        // Sort by most recent
        else if (value === "2") {
          courses.sort((a, b) => (a.published_at < b.published_at) ? 1 : -1);
        }
        // Sort by most viewed
        else if (value === "3") {
          courses.sort((a, b) => (a.views < b.views) ? 1 : -1);
        }
        generateCard(courses);
      }
    });
  }
  
  const filterBy = value => {
    console.log("heygirl")
    $("#num-videos").text("12 videos")
    const url = "https://smileschool-api.hbtn.info/courses";
  
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      contentType: "application/json",
      beforeSend: isLoaded(true, ".card-container"),
      success: function(data) {
          const {courses} = data;
          let newarray = [];

        $(".card-container").empty();
        isLoaded(false, ".card-container");

        // Filters by all
        if (value === "1") {
            newarray = courses.filter(function (element) {
                return element
            })
        }

        // Filters by Novice
        else if (value === "2") {
          newarray = courses.filter(function (element) {
            return element.topic === "Novice";
          });
        }
        // Filters by Intermediate
        else if (value === "3") {
          newarray = courses.filter(function (element) {
              return element.topic === "Intermediate";
          });
        }
      // Filters by Expert
        else if (value === "4") {
            newarray = courses.filter(function (element) {
                return element.topic === "Expert"
            });
        }
        generateCard(newarray);
      }
    });
  }

  function searchVideos(){
    const url = "https://smileschool-api.hbtn.info/courses";
    $.get(
        url,
        data => {
            const { courses } = data;
            const keyword = $("#keywords").val().toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            let filteredKeyword = [];
            filteredKeyword = courses.filter(function (element) {
                return element.keywords.indexOf(keyword) >= 0
            });
            generateCards(filteredKeyword);
        }
    )

    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      method: "GET",
      contentType: "application/json",
      beforeSend: isLoaded(true, ".search-text-area"),
      success: function(data) {
        const { courses } = data;
        const keyword = $("#q").val()

        console.log(keyword);  
      }
    })
  }

  function isLoaded(status, element) {
    if (status) {
      $(element).wrap('<div class="loader"></div>');
    } else {
      $(element).unwrap();
    }
  }
  
  /**
   * sortByPopular Sorts API response based of views
   * 
   * 
   */
  function sortByPopular() {
    const url = "https://smileschool-api.hbtn.info/courses";
  
    $.get(url, data => {
      const {
        courses
      } = data;
      console.log(courses);
  
      courses.sort((a, b) => (a.views < b.views) ? 1 : -1)
      console.log("hello");
      generateCard(courses);
    });
  }
  
  
  function generateCard(courses) {
    console.log("hello motherfucker")
  
  
    $(".card-container").append('<div class="section-title"><span class="text-muted video-count" id="number-videos">11 videos</span></div>');
    $(".card-container").append('<div class="row" id="card-sections"></div>');
    $("#number-videos").text(courses.length > 1 ? `${courses.length} videos` : "1 video");
    if (courses.length === 0) {
      $("#num-videos").text("No videos found");
    }
  
    courses.forEach(Element => {
      let stars = '';
      for (let i = 0; i < Element.star; i++) {
        stars += '<img src="images/star_on.png" width="15" height="15" alt="Star on">';
      }
      for (let j = 0; j < (5 - Element.star); j++) {
        stars += '<img src="images/star_off.png" width="15" height="15" alt="Star off">';
      }
      const card = $('<div class="col-12 col-sm-12 col-md-4 col-lg-3 d-flex justify-content-center">')
        .append(`
          <div class="card">
          <img
          src="${Element.thumb_url}"
          class="card-img-top"
          alt="Video thumbnail"
          />
          <div class="card-img-overlay text-center">
          <img
              src="images/play.png"
              alt="Play"
              width="64"
              class="align-self-center play-overlay"
          >
          </div>
          <div class="card-body">
          <h5 class="card-title font-weight-bold">${Element.title}</h5>
          <p class="card-text text-muted">
              ${Element["sub-title"]}
          </p>
          <div class="creator d-flex align-items-center">
              <img
              src="${Element.author_pic_url}"
              alt="Creator of Video"
              width="30"
              class="rounded-circle"
              >
              <h6 class="pl-3 m-0 main-color text-dark">${Element.author}</h6>
          </div>
          <div class="info pt-3 d-flex justify-content-between">
              <div class="rating">
                  ${stars}
              </div>
              <span class="main-color learn-span">${Element.duration}</span>
          </div>
          </div>
      </div>
          `)
      $("#card-sections").append(card)
    })
  }
  
  $(document).ready(function() {
    getDropDownMenu();
    sortByPopular();
  })
