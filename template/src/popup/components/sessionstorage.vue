<template>
 <div>
    {sessionstorage}
 </div>
</template>
<script>
export default {
  data: () => {  
    return{
      
    }
  },
  props: {
    data: {
      default: function() {
        return [{}]
      }
    },
    
  },
  created(){
    // let self = this;
    // chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
    //     self.getCookies(tab[0].url);
    // })
  },
  methods:{

  }
}
</script>
<style>

</style>


