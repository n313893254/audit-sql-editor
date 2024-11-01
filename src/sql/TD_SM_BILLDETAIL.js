export const TD_SM_BILLDETAIL = ({
  scriptNameSuffix,
  databaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
  isYear,
  drgFundDatabaseName,
}) => `create table td_sm_billDETAIL${scriptNameSuffix.value} as select * from td_sm_billDETAIL where 1=2;
truncate table td_sm_billDETAIL${scriptNameSuffix.value};
insert into td_sm_billDETAIL${scriptNameSuffix.value}
  select CreateGUID as ID,
         t.area_code,
         t.billdate,
         t.pid,
         t.ptype,
         t.item_date,
         t.item_id,
         t.item_name,
         t.price,
         t.numbers,
         t.costs,
         t.physician_id,
         t.physician_name,
         t.dept_id,
         t.deptname,
         t.usage,
         t.use_method,
         t.days_of_supply,
         t.eligible_amount,
         t.physician_level,
         t.physician_ap,
         t.approvalnumber,
         t.prescriptionno,
         t.costcategory,
         t.item_name_hospital,
         t.administrationid,
         t.item_type,
         t.frequency_interval,''
    from ${databaseName}.td_sm_billdetail${isComm33 ? '@comm33' : ''} t
   inner join ${databaseName}.tr_drgs_result${isComm33 ? '@comm33' : ''} a
      on a.pid = t.pid
   inner join ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} b
      on a.pid = b.hisid
   inner join ${databaseName}.td_mr_medical${isComm33 ? '@comm33' : ''} c
      on c.hosptial_id = b.hospital_id
     and c.admission_no = b.admission_number
     and c.is_upload = '1'
     and c.is_valid = '0'
/*   inner join ${drgFundDatabaseName}.dw_medical d
      on a.pid = d.hisid
   inner join ${drgFundDatabaseName}.gp_result e
      on a.pid = e.hisid*/
  ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=b.hospital_id and h.id_new in (${hospitals})
   where a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss');
commit;
`