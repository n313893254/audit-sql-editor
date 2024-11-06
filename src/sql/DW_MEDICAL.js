export const DW_MEDICAL = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table DW_MEDICAL${scriptNameSuffix.value} as select * from DW_MEDICAL where 1=2;
truncate table DW_MEDICAL${scriptNameSuffix.value};
insert into DW_MEDICAL${scriptNameSuffix.value}
  select a.pid,
         d.drgs_code,
         d.fund_type,
         decode(d.fund_type, '200', 'ְ职工', '202', '居民'),
         d.weight_score,
         d.allot_money,
         d.allot_money,
         d.s_score_value as SCORE_VALUE,
         '',
         '',
         '',
         '',
         '',
         d.b_score_value,
         d.p_score_value,
         ad.add_score_value,
         0,
         0,
         '',
         d.medical_type,
         d.social_allot_money,
         d.social_allot_money
    from  ${databaseName}.td_sm_bill${isYear ? '_year' : ''}${isComm33 ? '@comm33' : ''} b
  left join ${databaseName}.tr_drgs_result${isYear ? '_y' : ''}${isComm33 ? '@comm33' : ''} a
      ON A.PID=B.HISID
   left join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0'
   inner join ${drgFundDatabaseName}.${(isYear ? 'year_' : '').trim()}dw_medical${isComm33 ? '@comm33' : ''} d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.${(isYear ? 'year_' : '').trim()}gp_result${isComm33 ? '@comm33' : ''} e
      on a.pid = e.hisid
   ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
    left join ${drgFundDatabaseName}.${(isYear ? 'year_' : '').trim()}dw_add_score_apply${isComm33 ? '@comm33' : ''} ad on ad.hisid=b.hisid
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss');
commit;
`