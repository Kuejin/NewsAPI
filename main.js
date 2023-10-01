// API 불러오기
let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu)=>menu.addEventListener("click",()=>getNewsByTopic(event)))
const getLatestNews =async()=>{ // async와 await은 세트
	let url = new URL(
		`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
	);
	let header = new Headers({
		'x-api-key':'PP80CKQa36quprBlJ3XlhCGtcFJvuP4fngkktOVRHqQ'
	});
	let response = await fetch(url,{headers:header}) // ajax, http, fetch 등을 사용해서 보낼 수 있음
	let data = await response.json();
	news = data.articles;
	console.log(news);
	render();
};
const getNewsByTopic = async (event) => { // async와 await은 세트
	let topic = event.target.textContent.toLowerCase(); // 받은 토픽을 모두 소문자로 변환
	let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
	let header = new Headers({
		'x-api-key':'PP80CKQa36quprBlJ3XlhCGtcFJvuP4fngkktOVRHqQ',
	});
	let response = await fetch(url,{headers:header});
	let data = await response.json();
	news=data.articles;
	render();
}
const render=()=>{
	let newsHTML = '';
	newsHTML = news
		.map((item)=>{
		return `<div class="row news">
		<div class="col-lg-4">
			<img class="news-img-size" src="${item.media}"/>
		</div>
		<div class="col-lg-8">
			<h2>${item.title}</h2>
			<p>
				${item.summary}
			</p>
			<div>
				${item.rights} * ${item.published_date}
			</div>
		</div>
	</div>`;
	}).join(''); // map()은 배열을 리턴, 따라서 배열을 String으로 변환해주는 join()
	document.getElementById("news-board").innerHTML=newsHTML;
}
getLatestNews();