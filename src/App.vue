<script setup>
import { ref } from 'vue'
import { DW_MEDICAL } from './sql/DW_MEDICAL'
import { MR_AUDIT_RESULT } from './sql/MR_AUDIT_RESULT'
import { TD_SM_BILLDETAIL } from './sql/TD_SM_BILLDETAIL'
import { TD_SM_BILL } from './sql/TD_SM_BILL.js'
import { MR_AUDIT_RESULT_OPERATION } from './sql/MR_AUDIT_RESULT_OPERATION'
import { MR_AUDIT_RESULT_DISEASE } from './sql/MR_AUDIT_RESULT_DISEASE'
import { INSERT_DETAIL_INTO_COMM } from './sql/INSERT_DETAIL_INTO_COMM'

const sqlOptions = ref([
  'DW_MEDICAL',
  'MR_AUDIT_RESULT',
  'TD_SM_BILLDETAIL',
  'TD_SM_BILL',
  'MR_AUDIT_RESULT_OPERATION',
  'MR_AUDIT_RESULT_DISEASE',
  'INSERT_DETAIL_INTO_COMM',
])
const scriptMap = {
  DW_MEDICAL,
  MR_AUDIT_RESULT,
  TD_SM_BILLDETAIL,
  TD_SM_BILL,
  MR_AUDIT_RESULT_OPERATION,
  MR_AUDIT_RESULT_DISEASE,
  INSERT_DETAIL_INTO_COMM,
}
const regionOptions = [
  '南宁市',
  '梧州市',
  '玉林市',
]

const sqlScriptName = ref('DW_MEDICAL')
const scriptNameSuffix = ref('')
const script = ref(DW_MEDICAL({
  scriptNameSuffix,
}))
const region = ref(regionOptions[0])
const hospitals = ref('')
const dateRange = ref(['2024-01-01', `2024-10-01`])
const isYear = ref(false)

const regionMap = {
  '南宁市': {
    code: '4501',
    databaseName: 'comm_nn',
    originDataBaseName: 'yldy_nn',
    drgFundDatabaseName: 'drgs_fund_nn',
    isComm33: false,
  },
  '梧州市': {
    code: '4504',
    databaseName: 'comm_wz',
    originDataBaseName: 'yldy_wz',
    drgFundDatabaseName: 'drgs_fund_wz',
    isComm33: false,
  },
  '玉林市': {
    code: '4509',
    databaseName: 'comm_yl',
    originDataBaseName: 'yldy_yl',
    drgFundDatabaseName: 'drgs_fund_yl',
    isComm33: false,
  },
}

const onGenerate = () => {
  const startDate = dateRange.value[0]
  const endDate = dateRange.value[1]

  const payload = {
    scriptNameSuffix,
    code: regionMap[region.value]?.code,
    databaseName: regionMap[region.value]?.databaseName,
    originDataBaseName: regionMap[region.value]?.originDataBaseName,
    drgFundDatabaseName: regionMap[region.value]?.drgFundDatabaseName,
    isComm33: regionMap[region.value]?.isComm33,
    hospitals: hospitals.value,
    startDate,
    endDate,
    isYear: isYear.value,
  }

  script.value = scriptMap[sqlScriptName.value](payload)
}

onGenerate()
</script> 

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        DRG监管线下审核SQL脚本生成器
      </el-header>
      
      <el-main>
        <el-row :gutter="8">
          <el-col :span="8">
            <span>
              SQL脚本
            </span>
            <el-select
              v-model="sqlScriptName"
              placeholder="Select"
              @change="onGenerate"
            >
              <el-option
                v-for="item in sqlOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>

          <el-col :span="8">
            <span>
              脚本名称后缀
            </span>
            <el-input
              v-model="scriptNameSuffix"
              placeholder="Please input"
              @change="onGenerate"
            />
          </el-col>

          <el-col :span="8">
            <span>
              医保区划
            </span>
            <el-select
              v-model="region"
              placeholder="Select"
              @change="onGenerate"
            >
              <el-option
                v-for="item in regionOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>

        <el-row style="padding-top: 8px;" :gutter="8">
          <el-col :span="8">
            <span>
              医院
            </span>
            <el-input
              v-model="hospitals"
              placeholder="Please input"
              @change="onGenerate"
            />
          </el-col>

          <el-col :span="8">
            <span>
              年终清算
            </span>
            <el-select
              v-model="isYear"
              placeholder="Select"
              @change="onGenerate"
            >
              <el-option
                v-for="item in [{
                  label: '否',
                  value: false,
                }, {
                  label: '是',
                  value: true,
                }]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>

          <el-col :span="8">
            <div>
              日期范围
            </div>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              @change="onGenerate"
              value-format="YYYY-MM-DD"
            />
          </el-col>
        </el-row>

        <!-- <el-row style="padding-top: 8px;">
          <el-col :span="8" :offset="16">
            <el-button 
              type="primary"
              class="generate"
              @click="onGenerate"
            >
              生成
            </el-button>
          </el-col>
        </el-row> -->
      </el-main>
      <el-row >
        <el-col :span="24">
          <el-input
            v-model="script"
            :rows="30"
            type="textarea"
            placeholder="Please input"
          />
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout .el-header {
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding-top: 16px;
  text-align: center;
}

.common-layout .el-main {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-text-color-primary);
}

.generate {
  float: right;
}
</style>
