import{a as L,S as v,i as c}from"./assets/vendor-a57f9cde.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const S="27155167-60085c6995a1a3a14bfd0e86b",R="https://pixabay.com/api/",f=40;async function h(s,t){try{return await L.get(R,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:f}})}catch(o){console.error(o)}}const d=document.querySelector("#search-form"),p=document.querySelector(".gallery"),m=document.querySelector(".load-more");function g(s){return s.map(({webformatURL:t,largeImageURL:o,tags:n,likes:e,views:r,comments:a,downloads:w})=>`
        <a class="gallery__link" href="${o}">
          <div class="photo-card">
            <img class="gallery__image" src="${t}" alt="${n}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b> ${e}
              </p>
              <p class="info-item">
                <b>Views</b> ${r}
              </p>
              <p class="info-item">
                <b>Comments</b> ${a}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${w}
              </p>
            </div>
          </div>
        </a>`).join("")}d.addEventListener("submit",E);m.addEventListener("click",k);let i=1,l="",y=new v(".gallery a",{captionsData:"alt",captionDelay:250});async function E(s){if(s.preventDefault(),H(),_(),l=s.target.elements.searchQuery.value.trim(),!l){u(),d.reset();return}try{const t=await h(l,i),{data:o}=t,n=g(o.hits);if(n.length===0){u(),c.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",color:"red",position:"topRight"});return}if(c.show({title:"success",message:`Hooray! We found ${o.totalHits} images. `,color:"blue",position:"topRight"}),$(),b(n),y.refresh(),i*f>=o.totalHits){u();return}}catch{c.show({title:"error",message:"Whoops! Somethings wrong!",color:"red",position:"topRight"})}d.reset()}function b(s=""){p.insertAdjacentHTML("beforeend",s)}async function k(s){try{i+=1;const t=await h(l,i),{data:o}=t;i*f>=o.totalHits&&(u(),c.show({title:"warning",message:"We're sorry, but you've reached the end of search results.",color:"yellow",position:"topRight"}));const n=g(o.hits);b(n),y.refresh();const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch{c.show({title:"error",message:"Whoops! Somethings wrong!",color:"red",position:"topRight"})}}function H(){i=1}function _(){p.innerHTML=""}function $(){m.classList.remove("visually-hidden")}function u(){m.classList.add("visually-hidden")}
//# sourceMappingURL=commonHelpers.js.map
