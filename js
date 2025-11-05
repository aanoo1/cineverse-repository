// 电影数据 - 中英双语
const movies = [
    {
        id: 1,
        title: {
            zh: "卡萨布兰卡",
            en: "Casablanca"
        },
        year: 1942,
        rating: 8.5,
        genre: {
            zh: ["剧情", "爱情", "战争"],
            en: ["Drama", "Romance", "War"]
        },
        director: {
            zh: "迈克尔·柯蒂斯",
            en: "Michael Curtiz"
        },
        duration: {
            zh: "102分钟",
            en: "102 minutes"
        },
        description: {
            zh: "在二战期间的卡萨布兰卡，一位美国酒吧老板面临是否帮助他的前情人及其丈夫逃离纳粹迫害的艰难抉择。",
            en: "In WWII Casablanca, an American bar owner faces a moral dilemma when he must choose between helping his former lover and her husband escape the Nazis."
        },
        cast: {
            zh: ["亨弗莱·鲍嘉", "英格丽·褒曼", "保罗·亨雷德"],
            en: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid"]
        },
        country: {
            zh: "美国",
            en: "United States"
        },
        language: {
            zh: "英语",
            en: "English"
        },
        awards: {
            zh: "奥斯卡最佳影片、最佳导演、最佳剧本",
            en: "Academy Awards: Best Picture, Best Director, Best Screenplay"
        },
        quotes: [
            {
                text: {
                    zh: "永志不忘。",
                    en: "Here's looking at you, kid."
                },
                character: {
                    zh: "里克·布莱恩",
                    en: "Rick Blaine"
                }
            },
            {
                text: {
                    zh: "我们永远拥有巴黎。",
                    en: "We'll always have Paris."
                },
                character: {
                    zh: "里克·布莱恩",
                    en: "Rick Blaine"
                }
            }
        ],
        image: "images/casablanca.jpg"
    }
    // 可以添加更多电影数据...
];

// 渲染特色电影
function renderFeaturedMovies() {
    const featuredContainer = document.getElementById('featuredMovies');
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = movies.map(movie => `
        <div class="movie-card-classic" onclick="viewMovie(${movie.id})">
            <img src="${movie.image}" alt="${movie.title.zh}" onerror="this.src='images/classic-poster.jpg'">
            <div class="movie-card-content">
                <h4>${movie.title.zh} | ${movie.title.en}</h4>
                <p class="movie-rating">⭐ ${movie.rating}/10</p>
                <div class="movie-genres">
                    ${movie.genre.zh.map((genre, index) => 
                        `<span class="movie-genre">${genre} | ${movie.genre.en[index]}</span>`
                    ).join('')}
                </div>
                <p class="bilingual-text">
                    <span class="chinese">${movie.description.zh.substring(0, 80)}...</span>
                    <span class="english">${movie.description.en.substring(0, 80)}...</span>
                </p>
            </div>
        </div>
    `).join('');
}

// 查看电影详情
function viewMovie(movieId) {
    window.location.href = `movie-details.html?id=${movieId}`;
}

// 搜索电影
function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (!searchTerm) {
        renderMoviesGrid();
        return;
    }
    
    const filteredMovies = movies.filter(movie => 
        movie.title.zh.toLowerCase().includes(searchTerm) ||
        movie.title.en.toLowerCase().includes(searchTerm) ||
        movie.director.zh.toLowerCase().includes(searchTerm) ||
        movie.director.en.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredMovies(filteredMovies);
}

// 应用筛选
function applyFilters() {
    const genreFilter = document.getElementById('genreFilter');
    const yearFilter = document.getElementById('yearFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    
    const selectedGenre = genreFilter ? genreFilter.value : '';
    const selectedYear = yearFilter ? yearFilter.value : '';
    const selectedRating = ratingFilter ? ratingFilter.value : '';
    
    let filteredMovies = movies;
    
    if (selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.genre.zh.some(g => g === selectedGenre) ||
            movie.genre.en.some(g => g.toLowerCase() === selectedGenre)
        );
    }
    
    if (selectedYear) {
        filteredMovies = filteredMovies.filter(movie => 
            Math.floor(movie.year / 10) * 10 === parseInt(selectedYear)
        );
    }
    
    if (selectedRating) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.rating >= parseFloat(selectedRating)
        );
    }
    
    renderFilteredMovies(filteredMovies);
}

// 页面加载初始化
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedMovies();
    // 其他页面初始化代码...
});
