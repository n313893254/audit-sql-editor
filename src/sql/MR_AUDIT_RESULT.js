export const MR_AUDIT_RESULT = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table MR_AUDIT_RESULT${scriptNameSuffix.value} as select * from MR_AUDIT_RESULT where 1=2;
truncate table MR_AUDIT_RESULT${scriptNameSuffix.value};
insert into MR_AUDIT_RESULT${scriptNameSuffix.value}
select a.pid,
       a.bmi_code,
       a.billdate,
       c.id,
       a.hospital_id,
       b.hospital_name,
       b.admission_number,
       a.icd10,
       a.icd10_1to16,
       a.opr_main_icd9,
       a.nmain_opr_str,
       b.patient_sex,
       round((b.first_date - b.patient_birth) / 365, 0) age,
       d.hospital_days,
       c.newborn_weight,
       c.leave_hospital_type,
       '',
       '',
       '',
       '',
       '',
       ''
  from ${databaseName}.tr_drgs_result${isYear ? '_y' : ''}${isComm33 ? '@comm33' : ''} a
 inner join ${databaseName}.td_sm_bill${isYear ? '_year' : ''}${isComm33 ? '@comm33' : ''} b
    on a.pid = b.hisid
 inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
    on c.hosptial_id = b.hospital_id
   and c.admission_no = b.admission_number
   and c.is_upload = '1'
   and c.is_valid = '0'
 inner join ${drgFundDatabaseName}.${(isYear ? 'year_' : '').trim()}dw_medical${isComm33 ? '@comm33' : ''}  d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.${(isYear ? 'year_' : '').trim()}gp_result${isComm33 ? '@comm33' : ''}  e
      on a.pid = e.hisid
      ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 where a.billdate >=
       to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
   and a.billdate < to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss');
commit;
`