<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 医院信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
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
                <el-table-column prop="dept_name" label="医院名称"></el-table-column>
                <el-table-column prop="dept_level" label="医院等级"></el-table-column>
                <el-table-column prop="city_name" label="所属城市"></el-table-column>
                <el-table-column prop="distributor" label="经销商公司"></el-table-column>
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
                <el-form-item label="医院等级">
                    <el-input v-model="form.dept_level"></el-input>
                </el-form-item>
                <el-form-item label="所属城市">
                    <el-input v-model="form.city_name"></el-input>
                </el-form-item>
                <el-form-item label="经销商公司" label-width="85px">
                    <el-input v-model="form.distributor"></el-input>
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
                <el-form-item label="医院名称">
                    <el-input v-model="formAdd.adddept_name"></el-input>
                </el-form-item>
                <el-form-item label="医院等级">
                    <el-input v-model="formAdd.adddept_level"></el-input>
                </el-form-item>
                <el-form-item label="所属城市">
                    <el-input v-model="formAdd.addcity_name"></el-input>
                </el-form-item>
                <el-form-item label="经销商公司" label-width="85px" >
                    <el-input v-model="formAdd.adddistributor"></el-input>
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
        fetchDataForHospital,
        fetchDataHosByHospitalOrCity,
        fetchDatCity,
        fetchupdateDataforHospital,
        fetchdeleteDataForHospital,
        fetchAddDataForHospital, fetchDatDept, fetchDatDeptBydept, fetchHospitalExcel
    } from "../api/index";

    export default {
        name: "basetable",
        setup() {
            //过滤城市和医院的参数
            const hospital_name_input = ref("");
            const city_name_input = ref([]);
            //城市下拉框
            const options = ref([]);
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
            // 获取表格数据
            const getData = () => {
                fetchDataForHospital(query).then((res) => {
                    tableData.value = res.list;
                    pageTotal.value = res.pageTotal || 50;
                });
            };
            getData();

            // 查询操作
            const handleSearch = () => {
                //console.log("ddd" + hospital_name_input.value);
                /*query.dept_name = hospital_name_input;*/
                //过滤城市和医院
                const queryByParm = reactive({
                    city_name: city_name_input,
                    dept_name: hospital_name_input,
                    pageIndex: 1,
                    pageSize: 10,
                });
                fetchDataHosByHospitalOrCity(queryByParm).then((res) => {
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
                    city_name: city_name_input,
                    dept_name: hospital_name_input,
                    pageIndex: 1,
                    pageSize: 10000,
                });
                fetchHospitalExcel(queryByParm).then((res) => {
                    let blob = new Blob([res], { type: "application/xlsx" });
                    let url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a"); // 创建a标签
                    link.href = url;
                    link.download = "医院信息.xlsx"; // 重命名文件
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
                dept_name: "",
                dept_level: "",
                city_name: "",
                distributor:""
            });
            // 表格新增时弹窗和保存
            const addVisible = ref(false);
            let formAdd = reactive({
                 adddept_name: "",
                 adddept_level: "",
                 addcity_name: "",
                 adddistributor:""
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
                        fetchdeleteDataForHospital(deleteParm).then((res) => {
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
                fetchupdateDataforHospital(updateParm).then((res) => {
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
                fetchAddDataForHospital(addParm).then((res) => {
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
                handlePageChange,
                handleDelete,
                handleEdit,
                handleAdd,
                saveEdit,
                saveAdd,
                hospital_name_input,
                city_name_input,
                options,
                value: '',
                optionsfordept,
                getDeptByCity,
                handleSearchExcel,
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
