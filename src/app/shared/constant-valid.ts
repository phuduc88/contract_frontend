export const PLANCODECOUNTBHXH: any = [
  'TM', //Tăng mới
  'TC',
  'TD',
  'TH',
  'AD',
]

export const PLANCODECOUNTBHYT: any = [
  'TM',  
]

export const validationColumnsHeader: any = {
  'reissuehealthinsurancecard_I' :  {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },
    note: {
      message: 'Chấm dứt HĐLĐ/Chuyển công tác {0} {1}',
      argsColumn: ['contractCancelNo$ ,số VB ','dateCancelSign$ ,ngày '],  
    },
    copy: {
      type: 'I_1',      
      tableName : 'reductionlabor',
      note: 'Truy thu BHYT',
      planCode : 'TT'
    }
  }
}

export const validationColumnsPlanCodeBHYT: any = {
  'TM': {
    note: {
      message: 'Đóng mới BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'DL': {
    note: {
      message: 'Đóng lại BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'DT': {
    note: {
      message: 'Đóng tiếp BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'DC': {
    note: {
      message: 'Điều chỉnh BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'GB': {
    note: {
      message: 'Điều chỉnh BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'GD': {
    note: {
      message: 'Điều chỉnh BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  },'GH': {
    note: {
      message: 'Điều chỉnh BHXH từ {0}', 
      argsColumn: ['fromDate']    
    }
  }
 }

 export const validationColumnsPlanCode603: any = {
  'TM': {
    note: {
      message: 'Tăng mới BHYT của  {0} {1}',
      argsColumn: ['fullName$','fromDateJoin$, từ ngày '],  
    }
  },'DC': {
    note: {
      message: 'Điều chỉnh BHYT của {0} {1}',
      argsColumn: ['fullName$','fromDateJoin$, từ ngày '],  
    }
  },'GH': {
    note: {
      message: ' Giảm lương BHYT của {0} {1}',
      argsColumn: ['fullName$','fromDateJoin$, từ ngày '], 
    }
  } 
 }
export const RatioFamily: any = {
  1 : {
    percent: 100,
    ratio: 20
  },
  2 : {
    percent: 70,
    ratio: 20
  },
  3 : {
    percent: 60,
    ratio: 20
  },
  4 : {
    percent: 50,
    ratio: 20
  },
  5 : {
    percent: 40,
    ratio: 20
  },
  0 : {
    percent: 40,
    ratio: 20
  }
}

export const validationColumnsPlanCode: any = {
  'GH1': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },
    note: {
      message: 'Chấm dứt HĐLĐ/Chuyển công tác {0} {1}',
      argsColumn: ['contractCancelNo$ ,số VB ','dateCancelSign$ ,ngày '],  
    },
    copy: {
      type: 'I_1',      
      tableName : 'reductionlabor',
      note: 'Truy thu BHYT',
      planCode : 'TT'
    }
  },
  'DC': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },
    note: {
      message: 'Điều chỉnh tiền lương{0} {1}',
      argsColumn: ['contractCancelNo$ .số VB','dateCancelSign$,ngày '],     
    }
  },
  'CD': {
    contractCancelNo: {
      required: true,
    },
    levelWork: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },
    note: {
      message: 'Điều chỉnh chức danh{0} {1}', 
      argsColumn: ['contractCancelNo$ .số VB','dateCancelSign$,ngày '],           
    }
  },
  'TV' : {
    note: {
      message: 'Tăng quỹ HTTT{0} {1}', 
      argsColumn: ['contractCancelNo$ .số VB','dateCancelSign$,ngày '],      
    }
  },
   'AT' : {
    note: {
      message: 'Truy đóng theo MLCS tại thời điểm', 
      argsColumn: []      
    }
  },
  'GV' : {
    note: {
      message: 'Giảm quỹ HTTT{0} {1}', 
      argsColumn: ['contractCancelNo$ .số VB','dateCancelSign$,ngày '],   
    }
  },'DL' : {
    note: {
      message: 'Điều chỉnh lương/điều chỉnh chức danh tham gia BH TNLĐ, BNN',
      argsColumn: []   
    }
  },'DN' : {
    note: {
      message: 'Điều chỉnh tham gia thất nghiệp',
      argsColumn: []   
    }
  },
  'GH2': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Nghỉ hưu', 
      argsColumn: []    
    }
  },
  'GH3': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Nghỉ thai sản/ốm/không lương chuyển sang Giảm {0} {1}', 
      argsColumn: ['contractCancelNo$ ,số VB ','dateCancelSign$ ,ngày '],   
    }
  },
  'GH4': {
    motherDayDead: {
      required: true
    },note: {
      message: 'Giảm hẳn do chết, người lao động chết {0}  ', 
      argsColumn: ['motherDayDead$ ,ngày chết'],   
    }
  },
  'GC': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Giảm do chuyển tỉnh {0} {1}', 
      argsColumn: ['contractCancelNo$ ,số VB ','dateCancelSign$ ,ngày '],  
    },
    copy: {
      type: 'I_1',      
      tableName : 'reductionlabor',
      note: 'Truy thu BHYT',
      planCode : 'TT'
    }
  },
  'GD': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Giảm do chuyển đơn vị {0} {1}', 
      argsColumn: ['contractCancelNo$ ,số VB ','dateCancelSign$ ,ngày '],      
    } 
  },
  'SB': {
    toDate: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Giảm nguyên lương', 
      argsColumn: []    
    }
  },'OF': {
    note: {
      message: 'Nghỉ ốm', 
      argsColumn: []    
    },
    copy: {
      type: 'I_1',      
      tableName : 'reductionlabor',
      note: 'Truy thu BHYT',
      planCode : 'TT'
    }
  },'KL': {
    note: {
      message: 'Nghỉ không lương', 
      argsColumn: []    
    },
    copy: {
      type: 'I_1',      
      tableName : 'reductionlabor',
      note: 'Truy thu BHYT',
      planCode : 'TT'
    }
  },'TS': {
    note: {
      message: 'Nghỉ thai sản', 
      argsColumn: []    
    }
  },
  'AD': {
    toDate: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Tăng nguyên lương', 
      argsColumn: []    
    }
  },
  'TT': {
    toDate: {
      required: true,
    },note: {
      message: 'Tăng BHYT', 
      argsColumn: []    
    }
  },
  'TM': {
    note: {
      message: 'HĐLĐ số {0} ngày {1}', 
      argsColumn: ['contractNo','dateSign']    
    }
  },'TD': {
    note: {
      message: 'HĐLĐ số {0} ngày {1}', 
      argsColumn: ['contractNo','dateSign']    
    }
  },'TC': {
    note: {
      message: 'HĐLĐ số {0} ngày {1}', 
      argsColumn: ['contractNo','dateSign']    
    }
  },'TH': {
    note: {
      message: 'HĐLĐ dưới 3 tháng số {0} ngày {1}', 
      argsColumn: ['contractNo','dateSign']    
    }
  },'ON (ts)': {
    note: {
      message: 'Thai sản đi làm lại', 
      argsColumn: []    
    }
  },'ON (om)': {
    note: {
      message: 'Nghỉ ốm đi làm lại', 
      argsColumn: []    
    }
  },'ON (kl)': {
    note: {
      message: 'Nghỉ không lương đi làm lại', 
      argsColumn: []    
    }
  },
  'TU': {
    toDate: {
      required: true,
      lessThanNow: true
    },note: {
      message: 'Giảm BHYT', 
      argsColumn: []    
    }
  },
  'GN': {
    note: {
      message: 'Giảm BHTN', 
      argsColumn: []    
    }
  },
  'GL': {
    contractCancelNo: {
      required: true,
    },
    dateCancelSign: {
      required: true,
    },
    note: {
      message: 'Giảm BHTNLĐ, BNN', 
      argsColumn: []    
    }
  }
};
 
