import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface HeaderProps{
    title?:string;
    subtitle?:string;
    className?:string
    iconTitle?:any;
    iconSubtitle?:any;
    onClick?:() => void;
}

export const DashboardHeader = ({title, subtitle, className, iconTitle, iconSubtitle}: HeaderProps) => {

  return (
    <div className="flex text-left ">
      {title && 
            <h4 className={`text-muted ${className}`}>{iconTitle && iconTitle} {title}</h4>
      }
      {subtitle && 
      <span className={`mt-4 d-block text-primary ${className}`}>{iconSubtitle && iconSubtitle} {subtitle}</span>      
      }
    </div>
  );
};
