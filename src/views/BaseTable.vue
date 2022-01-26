<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 耗材信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="date_input" placeholder="统计日期" class="handle-select mr10">
                    <el-option
                            v-for="item in optionsfordate"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-select v-model="city_name_input" @change="getDeptByCity" placeholder="所属城市" class="handle-select mr10">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <!--<el-input v-model="hospital_name_input" placeholder="医院名称" class="handle-input mr10"></el-input>-->
                <!--医院下拉框选择-->
                <el-select v-model="hospital_name_input" placeholder="所属医院" class="handle-select1 mr10">
                    <el-option
                            v-for="item in optionsfordept"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
                <el-button type="primary" icon="el-icon-top-right" @click="handleSearchExcel">导出</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="dept_name" label="单位名称" width="150px"></el-table-column>
                <el-table-column prop="city_name" label="城市"></el-table-column>
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
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
            <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                           :page-size="query.pageSize" :total="pageTotal"
                           @current-change="handlePageChange"></el-pagination>
        </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <!-- <el-form-item label="医院名称">
                     <el-input v-model="form.hospital_name"></el-input>
                 </el-form-item>
                 <el-form-item label="医院等级">
                     <el-input v-model="form.hospital_level"></el-input>
                 </el-form-item>
                 <el-form-item label="所属城市">
                     <el-input v-model="form.city_name"></el-input>
                 </el-form-item>-->
                <el-form-item label="筛查电极">
                    <el-input v-model="form.scdj"></el-input>
                </el-form-item>
                <el-form-item label="治疗电极">
                    <el-input v-model="form.zldj"></el-input>
                </el-form-item>
                <el-form-item label="50*50">
                    <el-input v-model="form.A50x50"></el-input>
                </el-form-item>
                <el-form-item label="70*120">
                    <el-input v-model="form.A70x120"></el-input>
                </el-form-item>
                <el-form-item label="60*130">
                    <el-input v-model="form.A60x130"></el-input>
                </el-form-item>
               <!-- <el-form-item label="72*156">
                    <el-input v-model="form.A72x156"></el-input>
                </el-form-item>-->
                <el-form-item label="阴道哑铃">
                    <el-input v-model="form.ydyl"></el-input>
                </el-form-item>
                <el-form-item label="润滑剂">
                    <el-input v-model="form.rhj"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.marke"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 新增弹出框 -->
        <el-dialog title="新增" v-model="addVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="单位名称">
                    <el-input v-model="formAdd.adddept_name"></el-input>
                </el-form-item>
                <!--              <el-form-item label="医院等级">
                                  <el-input v-model="form.hospital_level"></el-input>
                              </el-form-item>
                              <el-form-item label="所属城市">
                                  <el-input v-model="form.city_name"></el-input>
                              </el-form-item>-->
                <el-form-item label="统计日期">
                    <el-input v-model="formAdd.addstat_date" placeholder="日期格式：2020-01"></el-input>
                </el-form-item>
                <el-form-item label="筛查电极">
                    <el-input v-model="formAdd.addscdj"></el-input>
                </el-form-item>
                <el-form-item label="治疗电极">
                    <el-input v-model="formAdd.addzldj"></el-input>
                </el-form-item>
                <el-form-item label="50*50">
                    <el-input v-model="formAdd.addA50x50"></el-input>
                </el-form-item>
                <el-form-item label="70*120">
                    <el-input v-model="formAdd.addA70x120"></el-input>
                </el-form-item>
                <el-form-item label="60*130">
                    <el-input v-model="formAdd.addA60x130"></el-input>
                </el-form-item>
               <!-- <el-form-item label="72*156">
                    <el-input v-model="formAdd.addA72x156"></el-input>
                </el-form-item>-->
                <el-form-item label="阴道哑铃">
                    <el-input v-model="formAdd.addydyl"></el-input>
                </el-form-item>
                <el-form-item label="润滑剂">
                    <el-input v-model="formAdd.addrhj"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="formAdd.addmarke"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import {ref, reactive} from "vue";
    import {ElMessage, ElMessageBox} from "element-plus";
    import {
        fetchData,
        fetchDataByHospitalOrCity,
        fetchDatCity,
        fetchupdateData,
        fetchdeleteData,
        fetchAddData,
        fetchDataForDate, fetchDatDeptBydept, fetchDatDept,fetchDataByHospitalOrCityExcel
    } from "../api/index";

    export default {
        name: "basetable",
        setup() {
            //过滤城市和医院和日期的参数
            const hospital_name_input = ref("");
            const city_name_input = ref([]);
            const date_input = ref([]);
            //城市下拉框
            const options = ref([]);
            //日期下拉框
            const optionsfordate = ref([]);
            const query = reactive({
                address: "",
                name: "",
                pageIndex: 1,
                pageSize: 10,
            });
            const tableData = ref([]);
            const pageTotal = ref(0);
            //医院下拉框
            const optionsfordept = ref([]);
            //获取下拉框城市
            const getDataCity = () => {
                fetchDatCity().then((res) => {
                    //console.log(res);
                    options.value = res;
                });
            };
            getDataCity();
            //初始化下拉框医院（获取所有的医院）
            const getDataDept = () => {
                fetchDatDept().then((res) => {
                    //console.log(res);
                    optionsfordept.value = res;
                });
            };
            getDataDept();
            //获取下拉框日期
            const getDataForDate = () => {
                fetchDataForDate().then((res) => {
                    console.log(res);
                    optionsfordate.value = res;
                });
            };
            getDataForDate();
            // 获取表格数据
            const getData = () => {
                fetchData(query).then((res) => {
                    tableData.value = res.list;
                    pageTotal.value = res.pageTotal || 50;
                });
            };
            getData();

            // 查询操作
            const handleSearch = () => {
                console.log("ddd" + hospital_name_input.value);
                /*query.hospital_name = hospital_name_input;*/
                //过滤城市和医院
                const queryByParm = reactive({
                    stat_date: date_input,
                    city_name: city_name_input,
                    dept_name: hospital_name_input,
                    pageIndex: 1,
                    pageSize: 100000,
                });
                fetchDataByHospitalOrCity(queryByParm).then((res) => {
                    tableData.value = res.list;
                    pageTotal.value = res.pageTotal || 50;
                });
                /*getData();*/
            };
            // 查询操作Excel
            const handleSearchExcel = () => {
                console.log("ddd" + hospital_name_input.value);
                /*query.hospital_name = hospital_name_input;*/
                //过滤城市和医院
                const queryByParm = reactive({
                    stat_date: date_input,
                    city_name: city_name_input,
                    dept_name: hospital_name_input,
                    pageIndex: 1,
                    pageSize: 100000,
                });
                fetchDataByHospitalOrCityExcel(queryByParm).then((res) => {
                    let blob = new Blob([res], { type: "application/xlsx" });
                    let url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a"); // 创建a标签
                    link.href = url;
                    link.download = "耗材信息.xlsx"; // 重命名文件
                    link.click();
                    URL.revokeObjectURL(url);
                });
                /*getData();*/
            };
            // 分页导航
            const handlePageChange = (val) => {
                query.pageIndex = val;
                getData();
            };

            // 表格编辑时弹窗和保存
            const editVisible = ref(false);
            let form = reactive({
                /*name: "",
                address: "",
                id: "",*/
                dept_name: "",
                city_name: "",
                scdj: "",
                zldj: "",
                A50x50: "",
                A70x120: "",
                A60x130: "",
                A72x156: "",
                ydyl: "",
                rhj: "",
                stat_date: "",
                marke: ""
            });
            // 表格新增时弹窗和保存
            const addVisible = ref(false);
            let formAdd = reactive({
                /* name: "",
                 address: "",*/
                adddept_name: "",
                addcity_name: "",
                addscdj: "",
                addzldj: "",
                addA50x50: "",
                addA70x120: "",
                addA60x130: "",
                addA72x156: "",
                addydyl: "",
                addrhj: "",
                addstat_date: "",
                addmarke: ""
            });
            // 删除操作
            const handleDelete = (index, row) => {
                Object.keys(form).forEach((item) => {
                    form[item] = row[item];
                });
                //console.log("delte:"+JSON.stringify(form))
                // 二次确认删除
                ElMessageBox.confirm("确定要删除吗？", "提示", {
                    type: "warning",
                })
                    .then(() => {
                        //将修改的行数据传后台接口
                        const deleteParm = reactive({
                            infoList: form
                        });
                        fetchdeleteData(deleteParm).then((res) => {
                            if (parseInt(res) > 0) {
                                //console.log(parseInt(res));
                                ElMessage.success("删除成功");
                                tableData.value.splice(index, 1);
                            } else {
                                ElMessage.success("删除失败");
                            }
                        }).catch(function (error) {
                            console.log(error);
                            ElMessage.success(`删除失败`);
                        });


                    })
                    .catch(() => {
                    });
            };

            let idx = -1;
            const handleEdit = (index, row) => {
                idx = index;
                //rowx=row;
                Object.keys(form).forEach((item) => {
                    form[item] = row[item];
                });
                editVisible.value = true;
            };
            //新增监听
            const handleAdd = (index, row) => {
                addVisible.value = true;
                console.log("dddd")
            };
            const saveEdit = () => {
                editVisible.value = false;
                //console.log("rtn"+JSON.stringify(rowx));
                Object.keys(form).forEach((item) => {
                    tableData.value[idx][item] = form[item];
                    //console.log(JSON.stringify(form));
                });
                //将修改的行数据传后台接口
                const updateParm = reactive({
                    infoList: form
                });
                fetchupdateData(updateParm).then((res) => {
                    //console.log(parseInt(res));
                    ElMessage.success(`修改第 ${idx + 1} 行成功`);

                }).catch(function (error) {
                    console.log(error);
                    ElMessage.success(`修改失败`);
                });
            };
            //新增保存监听
            const saveAdd = () => {
                addVisible.value = false;
                console.log(JSON.stringify(formAdd));
                //将修改的行数据传后台接口
                const addParm = reactive({
                    infoList: formAdd
                });
                fetchAddData(addParm).then((res) => {
                    //console.log(parseInt(res));
                    ElMessage.success(`保存成功`);

                }).catch(function (error) {
                    console.log(error);
                    ElMessage.success(`保存失败`);
                });
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
                tableData,
                pageTotal,
                editVisible,
                addVisible,
                form,
                formAdd,
                handleSearch,
                handleSearchExcel,
                handlePageChange,
                handleDelete,
                handleEdit,
                handleAdd,
                saveEdit,
                saveAdd,
                hospital_name_input,
                city_name_input,
                date_input,
                options,
                optionsfordate,
                value: '',
                optionsfordept,
                getDeptByCity,
            };
        },
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }
    .handle-select1 {
        width: 220px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
