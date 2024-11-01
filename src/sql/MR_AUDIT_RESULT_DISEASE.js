export const MR_AUDIT_RESULT_DISEASE = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value} as select * from MR_AUDIT_RESULT_DISEASE where 1=2;
truncate table MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value};
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.discharge_disease_id,
         c.discharge_disease_name,
         '1'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
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
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss');
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code2, c.diagnosis_name2, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
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
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code2 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code3, c.diagnosis_name3, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
/*   inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code3 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code4, c.diagnosis_name4, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code4 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code5, c.diagnosis_name5, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code5 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code6, c.diagnosis_name6, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code6 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code7, c.diagnosis_name7, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
/*   inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code7 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code8, c.diagnosis_name8, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code8 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID, a.pid, c.diagnosis_code9, c.diagnosis_name9, '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
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
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code9 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code10,
         c.diagnosis_name10,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code10 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code11,
         c.diagnosis_name11,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code11 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code12,
         c.diagnosis_name12,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
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
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code12 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code13,
         c.diagnosis_name13,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code13 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code14,
         c.diagnosis_name14,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code14 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code15,
         c.diagnosis_name15,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
  
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
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code15 is not null;
commit;
insert into MR_AUDIT_RESULT_DISEASE${scriptNameSuffix.value}
  select CreateGUID as ID,
         a.pid,
         c.diagnosis_code16,
         c.diagnosis_name16,
         '0'
    from ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on A.PID = B.HISID
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0' 
     ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
 /*  inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and c.diagnosis_code16 is not null;
commit;
`