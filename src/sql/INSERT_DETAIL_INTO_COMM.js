export const INSERT_DETAIL_INTO_COMM = ({
  code,
  databaseName,
  originDataBaseName,
  isComm33,
  hospitals,
  startDate,
  endDate,
}) => `insert into ${databaseName}.td_sm_billdetail${isComm33 ? '@comm33' : ''}
  select '${code}' area_code, 
         a.billdate billdate, 
         a.hisid pid, 
         b.list_type ptype, 
         b.fee_ocur_time item_date, 
         b.hilist_code item_id, 
         b.medins_list_name item_name, 
         b.pric price, 
         b.cnt numbers, 
         b.det_item_fee_sumamt costs, 
         b.bilg_dr_code physician_id, 
         b.bilg_dr_name physician_name, 
         b.bilg_dept_codg dept_id, 
         b.bilg_dept_name deptname, 
         '' usage, --nvl(sin_dos_dscr, 0)  usage, 
         b.medc_way_dscr use_method, 
         prd_days days_of_supply, 
         b.inscp_amt eligible_amount, 
         '' physician_level, 
         '' physician_ap, 
         b.chrg_bchno approvalnumber, 
         a.admission_number prescriptionno, 
         prodname costcategory, 
         b.medins_list_name item_name_hospital, -
         b.medc_way_dscr administrationid, 
         b.med_chrgitm_type item_type, 
         b.used_frqu_dscr frequency_interval 
  --b.hilist_name item_name_yb --ҽĿ
    from ${originDataBaseName}.FEE_LIST_D${isComm33 ? '@comm33' : ''} b, ${databaseName}.td_sm_bill${isComm33 ? '@comm33' : ''} a
    ${hospitals ? '' : '--'} inner join ${databaseName}.tb_hospital${isComm33 ? '@comm33' : ''} h on h.id=a.hospital_id and h.id_new in (${hospitals})
   where a.ADMISSION_NUMBER = b.setl_id
        --a.tradeno = b.mdtrt_id
        --and b.vali_flag ='1' --Ч־  1Ч 0Ч
     and a.billdate >=
         to_date('${startDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
     and a.billdate <
         to_date('${endDate} 00:00:00', 'yyyy-mm-dd hh24:mi:ss')
        
     and not exists (select 1
            from ${databaseName}.td_sm_billdetail${isComm33 ? '@comm33' : ''} C
           where A.HISID = C.PID);
commit;
`