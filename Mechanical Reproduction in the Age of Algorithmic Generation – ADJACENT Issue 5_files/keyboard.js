var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

let nav_button = document.getElementsByClassName("c-DropDown");

for (let i = 0; i < nav_button.length; i++) {
  nav_button[i].addEventListener("click", () => {
    nav_button[i].classList.toggle("is-active");
  });
}

let catalog = document.getElementsByClassName("catalog");
let catalog_closeBtn = document.getElementsByClassName("catalog__closeButton");
catalog_closeBtn[0].addEventListener("click", () => {
  catalog[0].classList.toggle("is-active");
  catalog_closeBtn[0].classList.toggle("is-active");
});

let hamburg = document.getElementsByClassName("c-ToggleMenu");
let menuOverlay = document.getElementById("c-ToggleMenu__toggle");
hamburg[0].addEventListener("keydown", e => {
  if (e.key === "Enter") menuOverlay.checked = !menuOverlay.checked;
});

let pre_issues = document.getElementsByClassName("c-DropDownToggle__info")[0];
let pre_issues_checkbox = document.getElementById("previous-issue");
pre_issues.addEventListener("keydown", e => {
  if (e.key === "Enter")
    pre_issues_checkbox.checked = !pre_issues_checkbox.checked;
});

let menu = document.getElementsByClassName("c-DropDownToggle__info")[1];
let menu_checkbox = document.getElementById("menu");
menu.addEventListener("keydown", e => {
  if (e.key === "Enter") menu_checkbox.checked = !menu_checkbox.checked;
});

// Mobile
// Menu Toggle
let menu_toggle = document.getElementById("c-ToggleMenu__toggle");
let menu_toggle_icon = document.getElementById("c-ToggleMenu");

menu_toggle.addEventListener("change", () => {
  if (menu_toggle.checked) {
    menu_toggle_icon.classList.add("c-ToggleMenu--reverse");
  } else {
    menu_toggle_icon.classList.remove("c-ToggleMenu--reverse");
  }
});

// Article cards
let article_container = document.getElementsByClassName("container");
let article_cards = document.getElementsByClassName("c-ArticleCard");

if (article_container.length > 0) {
  article_container[0].addEventListener("touchmove", () => {
    for (let i = 0; i < article_cards.length; i++) {
      let boundingBox_top_offset = article_cards[i].getBoundingClientRect().top;
      console.log();
      if (
        boundingBox_top_offset > 0 &&
        boundingBox_top_offset <
          (window.innerHeight - 300 ||
            document.documentElement.clientHeight - 300)
      ) {
        console.log(i);
        article_cards[i].classList.add("c-ArticleCard--focus");
      } else {
        article_cards[i].classList.remove("c-ArticleCard--focus");
      }
    }
  });

  article_container[0].addEventListener("scroll", () => {
    for (let i = 0; i < article_cards.length; i++) {
      let boundingBox_top_offset = article_cards[i].getBoundingClientRect().top;
      console.log();
      if (
        boundingBox_top_offset > 0 &&
        boundingBox_top_offset <
          (window.innerHeight - 300 ||
            document.documentElement.clientHeight - 300)
      ) {
        console.log(i);
        article_cards[i].classList.add("c-ArticleCard--focus");
      } else {
        article_cards[i].classList.remove("c-ArticleCard--focus");
      }
    }
  });

  article_container[0].addEventListener("gesturechange", () => {
    for (let i = 0; i < article_cards.length; i++) {
      let boundingBox_top_offset = article_cards[i].getBoundingClientRect().top;
      console.log();
      if (
        boundingBox_top_offset > 0 &&
        boundingBox_top_offset <
          (window.innerHeight - 300 ||
            document.documentElement.clientHeight - 300)
      ) {
        console.log(i);
        article_cards[i].classList.add("c-ArticleCard--focus");
      } else {
        article_cards[i].classList.remove("c-ArticleCard--focus");
      }
    }
  });
}

let t1 = 0;
let t2 = 0;
let timer = null; // 定时器

// scroll监听
document.onscroll = function() {
  clearTimeout(timer);
  timer = setTimeout(isScrollEnd, 100);
  t1 = document.documentElement.scrollTop || document.body.scrollTop;
};

function isScrollEnd() {
  t2 = document.documentElement.scrollTop || document.body.scrollTop;
  if (t2 == t1) {
    for (let i = 0; i < article_cards.length; i++) {
      let boundingBox_top_offset = article_cards[i].getBoundingClientRect().top;
      console.log();
      if (
        boundingBox_top_offset > 0 &&
        boundingBox_top_offset <
          (window.innerHeight - 300 ||
            document.documentElement.clientHeight - 300)
      ) {
        console.log(i);
        article_cards[i].classList.add("c-ArticleCard--focus");
      } else {
        article_cards[i].classList.remove("c-ArticleCard--focus");
      }
    }
  }
}

// console.log(document);
// document.addEventListener("click", e => {
//   console.log(e);
//   let active_element = document.getElementsByClassName('is-active');
//   console.log(active_element);
// });

function hideOnClickOutside(ele) {
  const outsideClickListener = event => {
    // console.log(event)
    if(!ele.contains(event.target)){
      console.log("not included")
      console.log(ele.classList.contains('is-active'))
      if(ele.classList.contains('is-active')){
        ele.classList.remove('is-active');
        catalog_closeBtn[0].classList.remove('is-active')
      }
      // removeClickEventListener()
    }
  }

  const removeClickEventListener = () => {
    document.removeEventListener('click', outsideClickListener)
  }

  document.addEventListener('click', outsideClickListener);
}

let active_element = document.getElementsByClassName('catalog')
hideOnClickOutside(active_element[0])


}
/*
     FILE ARCHIVED ON 02:12:50 Dec 12, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:06:32 Jul 24, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.855
  exclusion.robots: 0.041
  exclusion.robots.policy: 0.026
  esindex: 0.016
  cdx.remote: 121.013
  LoadShardBlock: 187.715 (3)
  PetaboxLoader3.datanode: 347.795 (5)
  load_resource: 427.935 (2)
  PetaboxLoader3.resolve: 208.079 (2)
*/