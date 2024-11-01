export const TD_SM_BILL = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table td_sm_bill${scriptNameSuffix.value} as select * from td_sm_bill where 1=2;
truncate table td_sm_bill${scriptNameSuffix.value};
insert into td_sm_bill${scriptNameSuffix.value}
  select b.area_code,
         b.hisid,
         b.billdate,
         b.hospital_id,
         b.hospital_name,
         b.hospital_fee_id,
         b.hospital_fee_name,
         b.hospital_out_name,
         b.patient_id,
         b.patient_name,
         b.patient_sex,
         b.patient_birth,
         b.benefit_type,
         b.benefit_group_id,
         b.claim_type,
         b.unusual_flag,
         b.admission_disease_id,
         b.discharge_disease_id,
         b.discharge_reason,
         b.disease_id,
         b.second_disease_id,
         b.third_disease_id,
         b.diagnosis_four,
         b.diagnosis_five,
         b.diagnosis_six,
         b.diagnosis_seven,
         b.diagnosis_eight,
         b.diagnosis_nine,
         b.diagnosis_ten,
         b.diagnosis_eleven,
         b.diagnosis_twelve,
         b.diagnosis_thirteen,
         b.diagnosis_fourteen,
         b.diagnosis_fifteen,
         b.diagnosis_sixteen,
         b.admission_date,
         b.discharge_date,
         b.first_date,
         b.disease_type,
         b.special_disease_code,
         b.patient_pregnant,
         b.patient_lactating,
         b.patient_height,
         b.patient_weight,
         b.in_patient_transfer_flag,
         b.bill_no,
         b.bmi_code,
         b.total_amount,
         b.bmi_convered_amount,
         b.yd_benefit_group_name,
         b.yd_benefit_region,
         b.tradeno,
         b.admission_number,
         b.specified_diseases,
         b.modelworker,
         b.login_date,
         b.wiped_money,
         b.cash_pay,
         b.billym,
         b.bmi_nopay,
         b.longterm,
         b.isunijunction,
         b.base_account_monty,
         b.supplement_money,
         b.base_account_monty_y,
         b.supplement_money_y,
         b.supplement_pub_money,
         b.large_amount_money,
         b.md5value,
         b.deptname,
         b.drgs_rejectmoney,
         b.reject_point,
         b.self_pay_money,
         b.self_care_money,
         b.fund_type,
         b.s_number01,
         b.s_number02,
         b.s_number03,
         b.s_number04,
         b.s_number05,
         b.s_number06,
         b.s_number07,
         b.s_number08,
         b.s_number09,
         b.s_number10,
         b.s_number11,
         b.arrange_pay_money,
         b.s_number12,
         b.s_number13,
         b.s_number14,
         b.s_number15,
         b.s_number16,
         b.other_account_money,
         b.longterm_item_count,
         b.settlement_category,
         b.region_source,
         b.disease_batch_code,
         b.drg_total_amount,
         b.special_amount,
         b.special_amount1,
         b.special_score_value2,
         bill.subject_code,
         b.patient_region_code,
         bill.ward_code,
         b.dept_code,
         bill.hospital_area_code,
         b.special_admission_number,
         b.day_operation_flag,
         b.arrive_region_code,
         b.s_number17,
         b.s_number18,
         b.s_number19,
         b.s_number20,
         b.s_number21,
         b.s_number22,
         b.s_number23,
         b.s_number24,
         b.s_number25,
         b.yd_flag
    from  ${databaseName}.td_sm_bill${isYear ? '_year' : ''}${isComm33 ? '@comm33' : ''} b
 --  left join ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   ---   ON A.PID=B.HISID 
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0'
   ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
  /* inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
      --left join yldy_qz.setl_d setl on setl.setl_id = b.admission_number
      left join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} bill on b.hisid = bill.hisid
   where b.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and b.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
         and b.fund_type in ('200','202');
commit;
`