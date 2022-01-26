import request from '../utils/request';
//---------------耗材信息查询-----------------------
export const fetchData = query => {
    return request({
        url: './get/getMaterialInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//根据条件查询表格
export const fetchDataByHospitalOrCity = query => {
    return request({
        url: './get/getMaterialInfoByCityOrHospital?xxxx=2',
        method: 'post',
        params: query
    });
};
//根据条件查询表格Excel
export const fetchDataByHospitalOrCityExcel = query => {
    return request({
        url: './excel/getMaterialInfoByCityOrHospitalExcel?xxxx=2',
        method: 'get',
        params: query,
        responseType: 'blob'
    });
};
//根据条件查询医院表格Excel
export const fetchHospitalExcel = query => {
    return request({
        url: './excel/getHospitalInfoByCityOrHospitalExcel?xxxx=2',
        method: 'get',
        params: query,
        responseType: 'blob'
    });
};
//根据柱状图查表格Excel
export const getInfoByBarExcel = query => {
    return request({
        url: './excel/getInfoByBarExcel?xxxx=2',
        method: 'get',
        params: query,
        responseType: 'blob'
    });
};
//下拉框单位
export const fetchDatCity = query => {
    return request({
        url: './get/getCity?xxxx=2',
        method: 'post',
        params: query
    });
};
//下拉框日期
export const fetchDataForDate = query => {
    return request({
        url: './get/getDate?xxxx=2',
        method: 'post',
        params: query
    });
};
//编辑表数据
export const fetchupdateData = query => {
    return request({
        url: './update/updateData?xxxx=2',
        method: 'post',
        params: query
    });
};
//删除表数据
export const fetchdeleteData = query => {
    return request({
        url: './delete/deleteById?xxxx=2',
        method: 'post',
        params: query
    });
};
//新增表数据
export const fetchAddData = query => {
    return request({
        url: './add/addInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//---------------医院信息查询-----------------------
export const fetchDataForHospital = query => {
    return request({
        url: './get/getHospitalInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//根据条件查询医院信息
export const fetchDataHosByHospitalOrCity = query => {
    return request({
        url: './get/getHospitalInfoByCityOrHospital?xxxx=2',
        method: 'post',
        params: query
    });
};
//编辑医院数据
export const fetchupdateDataforHospital = query => {
    return request({
        url: './update/updateDataForHospital?xxxx=2',
        method: 'post',
        params: query
    });
};
//删除医院数据
export const fetchdeleteDataForHospital = query => {
    return request({
        url: './delete/deleteByIdForHospital?xxxx=2',
        method: 'post',
        params: query
    });
};
//新增医院信息数据
export const fetchAddDataForHospital = query => {
    return request({
        url: './add/addHospitalInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//获取医院下拉框信息
export const fetchDatDept = query => {
    return request({
        url: './get/getHospitals?xxxx=2',
        method: 'post',
        params: query
    });
};
//获取医院下拉框信息
export const fetchDatDeptBydept = query => {
    return request({
        url: './get/getHospitalsByCity?xxxx=2',
        method: 'post',
        params: query
    });
};
//获取医院下拉框信息
export const fetchDataBarInfo = query => {
    return request({
        url: './get/getInfoBar?xxxx=2',
        method: 'post',
        params: query
    });
};
//查询预警项目
export const fetchDataWarnItem = query => {
    return request({
        url: './get/getWarnInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//登录
export const fetchLogin = query => {
    return request({
        url: './get/login?xxxx=2',
        method: 'post',
        params: query
    });
};
//登录
export const fetchLoginInfo = query => {
    return request({
        url: './get/loginInfo?xxxx=2',
        method: 'post',
        params: query
    });
};
//登录
export const fetchgetInfoByBar = query => {
    return request({
        url: './get/getInfoByBar?xxxx=2',
        method: 'post',
        params: query
    });
};