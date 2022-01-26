<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:310px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt/>
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div style="margin-top: 15px" class="user-info-list">
                        上次登录时间：
                        <span style="margin-left: 85px">{{loginTime}}</span>
                    </div>
                    <div style="margin-top: 15px" class="user-info-list">
                        上次登录IP：
                        <span style="margin-left: 98px">{{loginip}}</span>
                    </div>
                   <!-- <div style="margin-top: 15px" class="user-info-list">
                        上次登录地址：
                        <span style="margin-left: 85px">{{loginAdresss}}</span>
                    </div>-->
                    <div style="margin-top: 15px" class="user-info-list">
                        用户登录次数：
                        <span style="margin-left: 85px">{{loginCount}}</span>
                    </div>
                    <!--<div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>-->
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>医院耗材总量</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>
                    JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
                    CSS
                    <el-progress :percentage="13.7"></el-progress>
                    HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">


                   <!-- <div class="grid-content grid-con-1">
                        &lt;!&ndash;医院下拉框选择&ndash;&gt;
                        <el-select v-model="dept_name_input" placeholder="所属医院" class="handle-select mr10">
                            <el-option
                                    v-for="item in optionsfordept"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>-->
                    <div class="grid-content grid-con-2">
                        <!--选择月份范围-->
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker
                                    v-model="value1"
                                    type="monthrange"
                                    range-separator="至"
                                    start-placeholder="开始月份"
                                    end-placeholder="结束月份">
                            </el-date-picker>
                            <el-button style="margin-left: 5px" type="primary" icon="el-icon-search"
                                       @click="handleSearch()">搜索
                            </el-button>
                        </div>
                    </div>
                    <el-card style="margin-left: 40px" shadow="hover" :body-style="{ padding: '0px' } ">
                        <div class="grid-content grid-con-3">
                            <div class="grid-cont-right">
                                <div class="grid-num">{{count}}</div>
                                <div>未进耗材的医院数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-row>
                <el-card shadow="hover">
                    <el-table :data="tableData" border class="table" ref="multipleTable"
                              header-cell-class-name="table-header" height="400">
                        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="dept_name" label="单位名称"></el-table-column>
                        <el-table-column prop="city_name" label="所属城市"></el-table-column>
                        <el-table-column prop="dept_level" label="医院等级"></el-table-column>
                        <!-- <el-table-column prop="A50x50" label="50*50"></el-table-column>
                        <el-table-column prop="A70x120" label="70*120"></el-table-column>
                        <el-table-column prop="A60x130" label="60*130"></el-table-column>
                        <el-table-column prop="A72x156" label="72*156"></el-table-column>
                        <el-table-column prop="ydyl" label="阴道哑铃"></el-table-column>
                        <el-table-column prop="rhj" label="润滑剂"></el-table-column>-->
                        <!-- <el-table-column prop="stat_date" label="预警统计日期"></el-table-column>-->
                        <!-- <el-table-column prop="marke" label="备注"></el-table-column>-->
                    </el-table>
                    <div class="pagination">
                        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                                       :page-size="query.pageSize" :total="pageTotal"
                                       @current-change="handlePageChange"></el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" class="mgb20">

            <div class="grid-content grid-con-1" style="margin-left: 10px">
                <!--城市下拉框选择-->
                <el-select v-model="city_name_input" @change="getDeptByCity" placeholder="所属城市"
                           class="handle-select mr10">
                    <el-option
                            v-for="item in optionsforcity"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="grid-content grid-con-1" style="margin-left: 10px">
                <!--医院下拉框选择-->
                <el-select v-model="dept_name_input" placeholder="所属医院" class="handle-select mr10">
                    <el-option
                            v-for="item in optionsfordept"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="grid-content grid-con-2" style="margin-left: 5px ;width: 310px">
                <!--年份下拉框选择-->
                <el-select v-model="optionYear_input" placeholder="年份" class="handle-select mr10">
                    <el-option
                            v-for="item in optionYear"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button style="margin-left: 5px" type="primary" icon="el-icon-search"
                           @click="handleSearchBybar()">搜索
                </el-button>
                <el-button type="primary" icon="el-icon-top-right" @click="handleSearchExcel">导出表格</el-button>
            </div>

        </el-row>


        <el-row>
            <el-col>
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
        </el-row>
        <el-card shadow="hover">
        <el-table :data="tableData2" border class="table" ref="multipleTable" header-cell-class-name="table-header">
            <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
            <el-table-column prop="dept_name" label="单位名称" width="150px"></el-table-column>
           <!-- <el-table-column prop="city_name" label="城市"></el-table-column>-->
            <el-table-column prop="scdj" label="筛查电极"></el-table-column>
            <el-table-column prop="zldj" label="治疗电极"></el-table-column>
            <el-table-column prop="A50x50" label="50*50"></el-table-column>
            <el-table-column prop="A70x120" label="70*120"></el-table-column>
            <el-table-column prop="A60x130" label="60*130"></el-table-column>
            <!-- <el-table-column prop="A72x156" label="72*156"></el-table-column>-->
            <el-table-column prop="ydyl" label="阴道哑铃"></el-table-column>
            <el-table-column prop="rhj" label="润滑剂"></el-table-column>
            <el-table-column prop="stat_date" label="统计日期"></el-table-column>
            <el-table-column prop="marke" label="备注"></el-table-column>
        </el-table>
        </el-card>
        <el-row>
            <el-col>
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from "vue-schart";
    import {reactive, ref} from "vue";
    import {
        fetchDatDept,
        fetchDataBarInfo,
        fetchDataWarnItem,
        fetchDatCity,
        fetchDatDeptBydept,
        fetchLoginInfo,
        fetchgetInfoByBar,
        getInfoByBarExcel
    } from "../api/index";

    export default {
        name: "dashboard",
        components: {Schart},
        setup() {
            const name = sessionStorage.getItem("ms_username");
            const role = name === "admin" ? "超级管理员" : "普通用户";
            const dept_name_input = ref("");
            const city_name_input = ref("");
            const optionYear_input = ref("");
            //医院下拉框
            const optionsfordept = ref([]);
            const optionsforcity = ref([]);
            const value1 = ref("");
            const options = ref([]);
            const options2 = ref([]);
            const tableData = ref([]);
            const tableData2 = ref([]);
            const pageTotal = ref(0);
            const count = ref("");

            const loginip = ref("");
            const loginAdresss = ref("");
            const loginCount = ref("");
            const loginTime = ref("");

            const pageSize = ref(10);
            var myDate = new Date();
            const tYear = myDate.getFullYear();
            const optionYear = ref([
                {
                    value: tYear + 1,
                    label: tYear + 1,
                },
                {
                    value: tYear,
                    label: tYear,
                },
                {
                    value: tYear - 1,
                    label: tYear - 1,
                },
                {
                    value: tYear - 2,
                    label: tYear - 2,
                },
                {
                    value: tYear - 3,
                    label: tYear - 3,
                },
                {
                    value: tYear - 4,
                    label: tYear - 4,
                }
            ]);
            //获取下拉框城市
            const getDataCity = () => {
                fetchDatCity().then((res) => {
                    //console.log(res);
                    optionsforcity.value = res;
                });
            };
            getDataCity();
            //获取下拉框医院
            const getDataDept = () => {
                fetchDatDept().then((res) => {
                    //console.log(res);
                    optionsfordept.value = res;
                });
            };
            getDataDept();
            options.value = {
                type: "bar",
                title: {
                    text: "医院进销耗材统计情况",
                },
                xRorate: 25,
                labels: ["周一", "周二", "周三", "周四", "周五"],
                datasets: [
                    {
                        label: "开心值",
                        data: [234, 278, 270, 190, 230],
                    },
                    {
                        label: "开心值",
                        data: [164, 178, 190, 135, 160],
                    },
                    {
                        label: "开心值",
                        data: [144, 198, 150, 235, 120],
                    },
                ],
            };
            options2.value = {
                type: "line",
                title: {
                    text: "医院进销耗材统计情况",
                },
                labels: ["6月", "7月", "8月", "9月", "10月"],
                datasets: [
                    {
                        label: "开心值",
                        data: [234, 278, 270, 190, 230],
                    },
                    {
                        label: "开心值",
                        data: [164, 178, 150, 135, 160],
                    },
                    {
                        label: "开心值",
                        data: [74, 118, 200, 235, 90],
                    },
                ],
            };
            const query = reactive({
                dept_name: "",
                startTime: "",
                endTime: "",
                pageSize: 10,
            });
            const handleSearch = () => {
                let startTime = getTime(new Date(value1._value[0]));
                let endTime = getTime(new Date(value1._value[1]));
                let times = startTime + "," + endTime; //时间拼接
                const query11 = reactive({
                    dept_name: dept_name_input._value,
                    startTime: startTime,
                    endTime: endTime,
                });
                //预警的项目
                //console.log("ddd" + dept_name_input.value);
                const query = reactive({
                    dept_name: dept_name_input._value,
                    startTime: startTime,
                    endTime: endTime,
                    pageSize: 10,
                });
                fetchDataWarnItem(query).then((res) => {
                    console.log("123123" + res);
                    tableData.value = res.list;
                    //pageTotal.value = res.pageTotal || 50;
                    pageTotal.value = res.count || 6;
                    count.value = res.count;
                });
            };
            //查询用户的登录信息
            const queryLoginInfo = reactive({
                username: name,
            });
            fetchLoginInfo(queryLoginInfo).then((res) => {
                    loginip.value=res.login_ip,
                    loginAdresss.value=res.login_adress,
                    loginCount.value=res.count,
                    loginTime.value=res.login_time
                //count.value = res.count;
            });
            //下方查询柱状图的监听
            const handleSearchBybar = () => {
                const query11 = reactive({
                    dept_name: dept_name_input._value,
                    statYear: optionYear_input._value,
                });
                //柱状图 折线图
                fetchDataBarInfo(query11).then((res) => {
                    console.log("bar::::" + JSON.stringify(res));
                    options.value.title.text = dept_name_input._value + "进销耗材统计情况";
                    options.value.labels = res.labels;
                    options.value.datasets = res.bardata;

                    options2.value.title.text = dept_name_input._value + "进销耗材统计情况";
                    options2.value.labels = res.labels;
                    options2.value.datasets = res.bardata;
                });
                //获取柱状图对应的表格
                fetchgetInfoByBar(query11).then((res) => {
                    console.log("123123" + res);
                    tableData2.value = res;
                    //pageTotal.value = res.pageTotal || 50;
                    pageTotal.value = res.count || 6;
                    count.value = res.count;
                });
            };
            // 查询操作Excel
            const handleSearchExcel = () => {
                //过滤城市和医院
                const queryByParm = reactive({
                    dept_name: dept_name_input._value,
                    statYear: optionYear_input._value,
                });
                getInfoByBarExcel(queryByParm).then((res) => {
                    let blob = new Blob([res], { type: "application/xlsx" });
                    let url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a"); // 创建a标签
                    link.href = url;
                    link.download = "医院整年耗材信息.xlsx"; // 重命名文件
                    link.click();
                    URL.revokeObjectURL(url);
                });
                /*getData();*/
            };
            //时间格式化
            const getTime = (dt) => {
                var year = dt.getFullYear(); //年
                var month = dt.getMonth() + 1; //月
                var date = dt.getDate(); //日
                month = month < 10 ? "0" + month : month;
                date = date < 10 ? "0" + date : date;
                var str = year + "-" + month;
                return str;
            };
            const getDeptByCity = () => {
                const query22 = reactive({
                    city_name: city_name_input._value,
                });
                //获取下拉框城市
                fetchDatDeptBydept(query22).then((res) => {
                    //console.log(res);
                    optionsfordept.value = res;
                });

            };
            return {
                query,
                name,
                options,
                options2,
                role,
                dept_name_input,
                city_name_input,
                optionYear_input,
                optionsfordept,
                optionsforcity,
                handleSearch,
                handleSearchBybar,
                getDeptByCity,
                getTime,
                /*时间选择器*/
                value1,
                tableData,
                tableData2,
                pageTotal,
                count,
                optionYear,
                loginip,
                loginAdresss,
                loginCount,
                loginTime,
                handleSearchExcel,
            };
        },
    };
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        height: 370px;
    }
</style>
