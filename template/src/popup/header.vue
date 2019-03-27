<template>
    <div class='header'>
       <!-- <div>21</div>
        <div>22</div> -->
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
        return ''
      }
    }
  }
}
</script>
<style>
    .header{
        height:40px;
        display:flex;
        justify-content: space-around;
    }
</style>


