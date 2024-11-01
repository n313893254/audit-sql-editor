export const MR_AUDIT_RESULT_OPERATION = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table MR_AUDIT_RESULT_OPERATION${scriptNameSuffix.value} as select * from MR_AUDIT_RESULT_OPERATION where 1=2;
truncate table MR_AUDIT_RESULT_OPERATION${scriptNameSuffix.value};
insert into MR_AUDIT_RESULT_OPERATION${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         f.operation_date,
         g.operation_code,
         g.operation_name,
         g.is_major_iden
    from ${databaseName}.tr_drgs_result${isYear ? '_y' : ''}${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isYear ? '_year' : ''}${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0'
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   inner join ${databaseName}.td_mr_operation${isComm33 ? '@comm33' : ''} f
      on f.medical_id = c.id
   inner join ${databaseName}.td_mr_operationdetail${isComm33 ? '@comm33' : ''} g
      on f.id = g.operation_id
   ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss');
commit;
`