const OMDBAPI_KEY = '2936cd89';

Vue.component('movie-item', {
    props:['movie', 'favids'],
    methods:{
        getMovieDetail(id){
            this.$parent.getMovieDetail(id);
        },
        addToFavourite(id){
            this.$parent.addToFavourite(id);
        },
        inFav(id){
            return this.favids.indexOf(id)!==-1?false:true;
        },
    },
    template:`#movie_item`,
});

Vue.component('movie-rating', {
    props:['ratings'],
    data(){
        return {
            ratings_list:[]
        } 
    },
    watch:{
        ratings(new_val){
            this.ratings_list = new_val;
            for (let i = 0; i < this.ratings_list.length; i++) {
                if(this.ratings_list[i].Source==="Internet Movie Database"){
                    this.ratings_list[i].Width = 100 - this.ratings_list[i].Value.split('/')[0]*10;
                }else if(this.ratings_list[i].Source==="Rotten Tomatoes"){
                    this.ratings_list[i].Width = 100 - parseInt(this.ratings_list[i].Value);
                }else if(this.ratings_list[i].Source==="Metacritic"){
                    this.ratings_list[i].Width = 100 - this.ratings_list[i].Value.split('/')[0];
                }
            }
        }
    },
    template:'#movie_rating'
});

Vue.component('pagination', {
    props:['total', 'page'],
    methods:{
        goToPage(num){
            this.$parent.searchMovies(num);
        }
    },
    template:'#pagination'
});


const app = new Vue({
    el: '#app',
    data: {
        search: 'batman',
        type:'',
        year:'',
        currentYear:new Date().getFullYear()+1,
        movieDetail: {"Title":"Batman Begins","Year":"2005","Rated":"PG-13","Released":"15 Jun 2005","Runtime":"140 min","Genre":"Action, Crime","Director":"Christopher Nolan","Writer":"Bob Kane, David S. Goyer, Christopher Nolan","Actors":"Christian Bale, Michael Caine, Ken Watanabe","Plot":"After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.","Language":"English, Mandarin","Country":"United Kingdom, United States","Awards":"Nominated for 1 Oscar. 13 wins & 79 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"84%"},{"Source":"Metacritic","Value":"70/100"}],"Metascore":"70","imdbRating":"8.2","imdbVotes":"1,375,110","imdbID":"tt0372784","Type":"movie","DVD":"18 Oct 2005","BoxOffice":"$206,852,432","Production":"N/A","Website":"N/A","Response":"True"},
        // movieDetail:{},
        // movieList: {}
        movieList: {"Search":[{"Title":"Batman Begins","Year":"2005","imdbID":"tt0372784","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman v Superman: Dawn of Justice","Year":"2016","imdbID":"tt2975590","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman","Year":"1989","imdbID":"tt0096895","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"},{"Title":"Batman Returns","Year":"1992","imdbID":"tt0103776","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"},{"Title":"Batman Forever","Year":"1995","imdbID":"tt0112462","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Batman & Robin","Year":"1997","imdbID":"tt0118688","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"},{"Title":"The Lego Batman Movie","Year":"2017","imdbID":"tt4116284","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"},{"Title":"Batman: The Animated Series","Year":"1992–1995","imdbID":"tt0103359","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"},{"Title":"Batman: Under the Red Hood","Year":"2010","imdbID":"tt1569923","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","imdbID":"tt2313197","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"}],"totalResults":"490","Response":"True"},
        showModal:false,
        totalPages:50,
        currentPage:1,
        favList:[],
        favListIds:[],
        searchHistory:[]
    },
    // Это функция которая срабатывает на момент создания app(application), 
    // когда он создается мы можем что то делать
    created(){
        let fav_list = localStorage.getItem('fav_list');
        if(fav_list!==null){
            // через this обращ-ся к переменной(favList:[]) в data и делаем
            // обратное преобразование с помощью метода parse
            this.favList = JSON.parse(fav_list);
            this.favListIds = this.favList.map((el)=>{
                return el.imdbID;
            });
        };
        // Я дописывал 21.01
        let search_history = localStorage.getItem('search_history');
        if(search_history!==null){
            this.searchHistory = JSON.parse(search_history);
        };
    },


    methods: {
        clearHistory:function(){
            this.searchHistory = [];
            // Я дописывал 21.01
            this.searchHistory = localStorage.removeItem('search_history');
        },
        searchMovies:function(page=1){
            if(this.search!==""){
                if(this.searchHistory.indexOf(this.search)===-1){
                    this.searchHistory.push(this.search);
                    // Я дописывал 21.01 
                    localStorage.setItem('search_history', JSON.stringify(this.searchHistory));
                }
                let url = `https://www.omdbapi.com/?apikey=${OMDBAPI_KEY}&s=${this.search}`;
                if(this.type!==""){
                    url += `&type=${this.type}`
                }
                if(this.yaer!==""){
                    url += `&y=${this.year}`;
                }
                url += `&page=${page}`;
                this.currentPage = page;

                axios
                .get(url)
                .then((response)=> {
                    console.log(response);
                    if(response.data.Response==="True"){
                        this.movieList = response.data;
                        this.totalPages = Math.ceil(this.movieList.totalResults/10);
                    }else{
                        // alert(response.data.Error);
                        panel.warning(response.data.Error, true);
                    }
                })
            }else{
                // alert("Enter search text");
                panel.info("Enter search text", true);
            }
        },
        getMovieDetail:function(movie_id){
            axios
            .get(`https://www.omdbapi.com/?apikey=${OMDBAPI_KEY}&i=${movie_id}`)
            .then((resp)=>{
                this.movieDetail = resp.data;
                this.showModal = true;
            })
        },
        addToFavourite: function(movie_id){
            const movieToFav = this.movieList.Search.find((el)=>el.imdbID==movie_id);
            let ind = this.favList.findIndex((el)=>el.imdbID==movie_id);
            if(ind===-1){
                this.favList.push(movieToFav);
            }else{
                this.favList.splice(ind, 1);
            }
            this.favListIds = this.favList.map((el)=>{
                return el.imdbID;
            });
            localStorage.setItem('fav_list', JSON.stringify(this.favList));
        }
    }
});