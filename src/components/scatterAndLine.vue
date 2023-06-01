<script setup>
    import { ref, reactive,onMounted, watch,watchEffect, computed,onUnmounted } from 'vue'
    import * as echarts from 'echarts'
    

    const chartContainer = ref(null);
    let chartInstance 
  
    // 在vue3中，由于响应式代理的特性，echarts官方文档不建议直接使用ref或者reactive来代理echarts的实例对象，它会造成许多预料之外的错误，如：
    // 1.tooltips无法显示
    // 2.dataZoom无法使用

    // 所以建议声明一个非响应式的变量来代理echarts实例对象，然后在onMounted钩子函数中初始化echarts实例对象，最后在onUnmounted钩子函数中销毁echarts实例对象，或者使用shallowRef代理echarts实例对象，这样就不会造成上述问题了。

    const option = reactive({
        title: {
            text: '散点图和折线图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            show:true,
            formatter:function (params) {
                let scatterData = null;
                let lineData = null;
                // 遍历经过的每个series的数据
            for (let i = 0; i < params.length; i++) {
             let seriesName = params[i].seriesName;
             if (seriesName === '散点') {
              scatterData = params[i].data;
        } else if (seriesName === '折线') {
          lineData = params[i].data;
        }
      }
      if (scatterData && lineData) {
        let diff = Math.abs(scatterData[1] - lineData[1]);
        return '散点图y坐标: ' + scatterData[1] + '<br>' +
               '折线图y坐标: ' + lineData[1] + '<br>' +
               '差值: ' + diff;
      } else {
        return '';
      }
    }
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            splitLine: { show: true }
        },
        yAxis: {
            splitLine: { show: true },
            type: 'value'
        },
        
 
     
        series: [
            {
            name: '散点',
            type: 'scatter',
            symbolSize: 5,
              itemStyle:{
     
                    color:"blue"

            },
            data: [
                ['周一', 1.2],
                ['周二', 22],
                ['周三', 3.1],
                ['周四', 14],
                ['周五', 25],
                ['周六', 17],
                ['周日', 10e-1]
            ],
         
  
        }, {
            name: '折线',
            type: 'line',
            itemStyle: {
     
                    color: "green"
                
            },
            data: [
                ['周一', 5],
                ['周二', 15],
                ['周三', 2],
                ['周四', 3.789],
                ['周五', 2.1212],
                ['周六', 0.11147e-3],
                ['周日', 5]
            ],
            smooth: true
        }]
    })
   


    onMounted( () => {

    chartInstance  =  echarts.init(chartContainer.value);
      chartInstance.setOption(option)


     
    })

    const changeToRed = ()=>{
        // 找到option中name==='散点'的series，将其itemStyle.color改为'red'
        option.series.find(item=>item.name==='散点').itemStyle.color = 'red'
        chartInstance.setOption(option)
       

    }

    onUnmounted(()=>{
        chartInstance.dispose()
    })



</script>

<template>

    <div ref="chartContainer" style="width: 600px;height:400px;">
        
    </div>
    <div class="color">
        <button @click="changeToRed">将散点图颜色改为红色</button>
    <button @click="changeToBlue">将折线图颜色改为蓝色</button>
    </div>
</template>

<style scoped lang="scss">

</style>