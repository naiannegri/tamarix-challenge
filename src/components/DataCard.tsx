import React from 'react';

export interface DataCardProp{
title: string;
subtitle: string;
}

const DataCard = ({title, subtitle}: DataCardProp) => {
return(<>
    <div className="p-3 bg-second h-100" style={{ borderRadius: "10px", position:"relative" }}>
        <h4 className="mb-n2 text-primary" data-testid="title-card" >{title}</h4>
        <h6 className='text-muted mt-3'>{subtitle}</h6>
      </div>
</>)
}

export default DataCard;