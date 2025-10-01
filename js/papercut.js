(function(){
    var summaryEl = document.getElementById('pc-summary');
    var linksEl = document.getElementById('pc-links');

    function render(data){
        if (!data || data.ok === false) {
            summaryEl.textContent = (data && data.message) || '未获取到内容';
            return;
        }
        summaryEl.textContent = data.summary || '暂无简介';
        if (Array.isArray(data.links)) {
            linksEl.innerHTML = '';
            data.links.forEach(function(item){
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = item.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = item.title || item.url;
                li.appendChild(a);
                linksEl.appendChild(li);
            });
        }
    }

    fetch('http://localhost:8787/api/scrape?topic=' + encodeURIComponent('中国剪纸'))
        .then(function(r){ return r.json(); })
        .then(render)
        .catch(function(err){
            summaryEl.textContent = '请求失败：' + (err && err.message ? err.message : String(err));
        });
})();


