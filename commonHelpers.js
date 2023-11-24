import{a as b,S as w,i as a}from"./assets/vendor-a57f9cde.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const L="27155167-60085c6995a1a3a14bfd0e86b",R="https://pixabay.com/api/",d=40;async function h(s,o){try{return await b.get(R,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:d}})}catch(t){console.error(t)}}const i={formRef:document.querySelector("#search-form"),galleryRef:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")};function m(s){return s.map(({webformatURL:o,largeImageURL:t,tags:n,likes:e,views:r,comments:c,downloads:y})=>`
          <a class="gallery__link" href="${t}">
            <div class="photo-card">
              <img class="gallery__image" src="${o}" alt="${n}" loading="lazy" />
              <div class="info">
                <p class="info-item">
                  <b>Likes</b> ${e}
                </p>
                <p class="info-item">
                  <b>Views</b> ${r}
                </p>
                <p class="info-item">
                  <b>Comments</b> ${c}
                </p>
                <p class="info-item">
                  <b>Downloads</b> ${y}
                </p>
              </div>
            </div>
          </a>`).join("")}i.formRef.addEventListener("submit",v);i.btnLoadMore.addEventListener("click",S);let l=1,u="",g=new w(".gallery a",{captionsData:"alt",captionDelay:250});async function v(s){if(s.preventDefault(),E(),H(),u=s.target.elements.searchQuery.value.trim(),!u){f(),i.formRef.reset();return}try{const o=await h(u,l),{data:t}=o,n=m(t.hits);if(n.length===0){f(),a.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",color:"red",position:"topRight"});return}if(t.hits.length===t.totalHits&&a.show({title:"warning",message:"We're sorry, but you've reached the end of search results.",color:"yellow",position:"topRight"}),a.show({title:"success",message:`Hooray! We found ${t.totalHits} images. `,color:"blue",position:"topRight"}),M(),p(n),g.refresh(),l*d>=t.totalHits){f();return}}catch{a.show({title:"error",message:"Whoops! Somethings wrong!",color:"red",position:"topRight"})}i.formRef.reset()}function p(s=""){i.galleryRef.insertAdjacentHTML("beforeend",s)}async function S(s){try{l+=1;const o=await h(u,l),{data:t}=o;l*d>=t.totalHits&&(f(),a.show({title:"warning",message:"We're sorry, but you've reached the end of search results.",color:"yellow",position:"topRight"}));const n=m(t.hits);p(n),g.refresh();const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch{a.show({title:"error",message:"Whoops! Somethings wrong!",color:"red",position:"topRight"})}}function E(){l=1}function H(){i.galleryRef.innerHTML=""}function M(){i.btnLoadMore.classList.remove("visually-hidden")}function f(){i.btnLoadMore.classList.add("visually-hidden")}
//# sourceMappingURL=commonHelpers.js.map
