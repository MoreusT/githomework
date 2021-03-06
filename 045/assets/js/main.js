const OMDB_API_KEY = '84ae8b62';

const app = Vue.createApp({
    data(){
        return {
            search: '',
            // result:{"Search":[{"Title":"Batman Begins","Year":"2005","imdbID":"tt0372784","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman v Superman: Dawn of Justice","Year":"2016","imdbID":"tt2975590","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Batman","Year":"1989","imdbID":"tt0096895","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"},{"Title":"Batman Returns","Year":"1992","imdbID":"tt0103776","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"},{"Title":"Batman Forever","Year":"1995","imdbID":"tt0112462","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"Batman & Robin","Year":"1997","imdbID":"tt0118688","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"},{"Title":"The Lego Batman Movie","Year":"2017","imdbID":"tt4116284","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"},{"Title":"Batman: The Animated Series","Year":"1992–1995","imdbID":"tt0103359","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"},{"Title":"Batman: Under the Red Hood","Year":"2010","imdbID":"tt1569923","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNmY4ZDZjY2UtOWFiYy00MjhjLThmMjctOTQ2NjYxZGRjYmNlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","imdbID":"tt2313197","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"}],"totalResults":"437","Response":"True"},
            result:{},
            // details:{"Title":"Batman Begins","Year":"2005","Rated":"PG-13","Released":"15 Jun 2005","Runtime":"140 min","Genre":"Action, Adventure","Director":"Christopher Nolan","Writer":"Bob Kane, David S. Goyer, Christopher Nolan","Actors":"Christian Bale, Michael Caine, Ken Watanabe","Plot":"When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia, where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as &quot;Batman&quot;. But it doesn't stay quiet for long.","Language":"English, Mandarin","Country":"United Kingdom, United States","Awards":"Nominated for 1 Oscar. 13 wins & 79 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.2/10"},{"Source":"Rotten Tomatoes","Value":"84%"},{"Source":"Metacritic","Value":"70/100"}],"Metascore":"70","imdbRating":"8.2","imdbVotes":"1,334,626","imdbID":"tt0372784","Type":"movie","DVD":"09 Sep 2009","BoxOffice":"$206,852,432","Production":"Warner Brothers, Di Bonaventura Pictures","Website":"N/A","Response":"True"},
            details:{},
            showModal: false,
            type:"",
            year:"",
            fav_list:[],
            showPanel:false,
            page:1,
            rowView:false,
            search_history:[],
            showDrop: false,
        }
    },
    created() {
        this.fav_list = localStorage.getItem("fav_movie")!=null?JSON.parse(localStorage.getItem("fav_movie")):[];
        this.search_history = localStorage.getItem("history")!=null?JSON.parse(localStorage.getItem("history")):[];
        if(localStorage.getItem('view')!=null){
            this.rowView = (localStorage.getItem('view')==='true');
        }
        new WOW().init();
    },
    methods: {
        searchMovie(e){
            e.preventDefault();
            if(this.search!==''){
                if(this.search_history.indexOf(this.search.toLowerCase())===-1){
                    if(this.search_history.length==5){
                        this.search_history.pop();
                    }
                    this.search_history.unshift(this.search.toLowerCase());
                    localStorage.setItem('history', JSON.stringify(this.search_history));
                }
                this.page = 1;
                axios
                    .get('http://www.omdbapi.com/?apikey='+OMDB_API_KEY+'&s='+this.search+'&type='+this.type+'&y='+this.year+'&page='+this.page)
                    .then((resp)=>{
                        this.changeStar(resp.data);
                    })
            } else {
                console.warn('Enter search request');
            }
        },
        goToPage(new_page){
            this.page = new_page;
            axios
                .get('http://www.omdbapi.com/?apikey='+OMDB_API_KEY+'&s='+this.search+'&type='+this.type+'&y='+this.year+'&page='+this.page)
                .then((resp)=>{
                    this.changeStar(resp.data);
                })
        },
        changeStar(rez) {
            let rds = rez.Search;
            for(let i=0;i<rds.length;i++){
                const ind = this.fav_list.findIndex((el)=>el.imdbID === rds[i].imdbID);
                if(ind!=-1){
                    rds[i].inFav = true;
                } else {
                    rds[i].inFav = false;
                }
            }
            this.result.Search = rds;
            this.result.totalResults = parseInt(rez.totalResults);
        },
        detail(imdbID) {
            axios
                .get('http://www.omdbapi.com/?apikey='+OMDB_API_KEY+'&i='+imdbID+'&plot=full')
                .then((resp)=>{
                    this.details = resp.data
                    this.metacriticLink();
                    this.details.imdbLink = "https://www.imdb.com/title/" + this.details.imdbID;
                    this.showModal = true;
                })
        },
        metacriticLink() {
            let title = this.details.Title;
            title = title.replace(/\s+/g, '-').toLowerCase();
            this.details.link = "https://www.metacritic.com/movie/" + title;
        },
        toggleFav(imdbID) {
            if(this.fav_list.length!=0){
                const ind = this.fav_list.findIndex((el)=>el.imdbID === imdbID);
                if(ind!=-1){
                    this.fav_list.splice(ind, 1);
                } else {
                    const favItem = this.result.Search.find((el)=>el.imdbID === imdbID);
                    this.fav_list.push(favItem);
                }
            } else {
                const favItem = this.result.Search.find((el)=>el.imdbID === imdbID);
                this.fav_list.push(favItem);
            }
            this.changeStar(this.result);

            localStorage.setItem("fav_movie", JSON.stringify(this.fav_list));
        },
        closePanel() {
            this.showPanel = false;
        },
        changeView(is_row) {
            this.rowView = is_row;
            localStorage.setItem('view', is_row);
        },
        resetSearch() {
            localStorage.removeItem("history");
            this.search_history = [];

        },
        resetAll() {
            this.search = '';
            this.result = {"Search":[],"totalResults":0};
            this.details = {};
            this.type = "";
            this.year = "";
        },
        dropDown() {
            this.showDrop = this.showDrop===false?true:false;
        }
    }
});

app.component('movie-ratings', {
    props:['ratings'],
    data() {
        return {
            ratings_list:[]
        }
    },
    watch: {
        ratings(new_val){
            this.ratings_list = typeof new_val==="object"?new_val:[];
            for(let i=0;i<this.ratings_list.length;i++){
                switch(this.ratings_list[i].Source){
                    case 'Internet Movie Database':
                        this.ratings_list[i].Width = 100 - parseFloat(this.ratings_list[i].Value.split('/')[0])*10;
                        break;
                    case 'Rotten Tomatoes':
                        this.ratings_list[i].Width = 100 - parseInt(this.ratings_list[i].Value);
                        break;
                    case 'Metacritic':
                        this.ratings_list[i].Width = 100 - parseInt(this.ratings_list[i].Value.split('/')[0]);
                        break;
                    }
            }
        }
    },
    template:'#ratings_list'
});

app.component('fav_panel', {
    props:['list', 'show'],
    methods: {
        detail(imdbID) {
            this.$parent.detail(imdbID);
        },
        closePanel() {
            this.$parent.closePanel();
        },
        toggleFav(imdbID) {
            this.$parent.toggleFav(imdbID);
        }
    },
    template: '#fav_panel'
});

app.component('pagination', {
    props:['page', 'total_items'],
    data(){
        return {
            total_pages:0,
            per_page:10,
        }
    },
    watch: {
        total_items(new_val) {
            this.total_pages = Math.ceil(new_val/this.per_page);
        },
    },
    methods: {
        goToPage(num) {
            this.$parent.goToPage(num);
        },
        goToPrev(){
            this.$parent.goToPage(this.page-1);
        },
        goToNext(){
            this.$parent.goToPage(this.page+1);
        }
    },
    template: '#pagination'
});

app.mount("#app");