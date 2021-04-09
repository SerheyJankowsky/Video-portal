<template>
  <div class="wraper">
    <div class="header">
      <div class="container">
        <div class="header__content">
          <i class="header__logo">
            <img src="@/assets/video-camera.png" alt="">
          </i>
          <h1>Video-Portal</h1>
          <div class="search_item">
            <input v-show="isShow" class="input" type="text" placeholder="Search movie" v-model="search" @input="searchItem">
            <img class="search" src="@/assets/search.png" alt="" @click="isActives" >
          </div>
          <button class="logout" @click="logout">LogOut</button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="container">
        <div class="body__content">
          <div class="card"   v-for="v in video">
            <div class="card__video">
              <iframe width="560" height="320" :src="v"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
name: "Main",
  data(){
  return{
    apiKey:'21081474-5614e26cba8ca1c9e7a7fca14',
    video:[],
    search:'',
    isShow:false,
  }
  },
  methods:{
    async request(url){
      const response = await fetch(url)
      return await response.json()
    },
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    },
    isActives(){
      if(this.isShow){
        this.isShow = false
      }else {
        this.isShow = true
      }
      console.log(this.video.videos)
    },
    async searchItem(){
      this.video = []
      const res = await this.request(`https://pixabay.com/api/videos/?key=${this.apiKey}&q=${this.search}`)
      for (let i in res.hits){
        this.video.push(res.hits[i].videos.medium.url)
      }
    }
  },
  async mounted(){
    const res = await this.request(`https://pixabay.com/api/videos/?key=${this.apiKey}&q=New`)
    for (let i in res.hits){
     this.video.push(res.hits[i].videos.medium.url)
    }
  }
}
</script>

<style scoped>
.search{
  width:20px;
  height: 20px;
  cursor: pointer;
}
.wraper{
  width: 100%;
  height: 100vh;
}
.container{
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.header{
  width: 100%;
  background-color: #6a6f8c;
  position: fixed;
  left: 0;
  top: 0;
}
.header__content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.header__logo{
  max-width: 50px;
  max-height: 50px;
}
img{
  max-width: 100%;
  max-height: 100%;
}
.logout{
  border: none;
  background-color: #6a6f8c;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.logout:hover{
  color: #FFE5B4;
  transition: 0.1s linear;
}
.logout:active:focus{
  background-color: #6a6f8c;
  font-size: 18px;
}
.body{
  margin-top: 80px;
  width: 100%;
}
.body__content{
  display: flex;
  flex-wrap: wrap;
}
.search{
  margin-left: 5px;
}
.search_item{
  display: flex;
  align-items: center;
}
.input{
  width: 320px;
  height: 30px;
  border-radius: 50px;
  text-align: center;
}
.input:focus {
  outline: none !important;
}
.card{
  margin-left: 10px;
  margin-bottom: 10px;
}



</style>
