import React, { useState } from 'react'
import './specs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { height } from '@mui/system';


export default function Specs({ item }) {


    const [open, setOpen] = useState(false)
    return (
        <div className='Specs'>
            <h4 className='title' onClick={()=>setOpen(!open)}>Specifications <FontAwesomeIcon className="spec-arrow" icon={faAngleDown} style={{transform : open ? 'rotateZ(180deg)' : ''}} /></h4>
            <div className='main-specs' style={{
                height: open ? '100%' : '0px',
                overflow: 'hidden'
            }}>
                <h6>Technical specifications for {item.name}
                </h6>
                <div className='specifications'>
                    {
                        item.specifications.map((category) => {
                            return (
                                Object.entries(category).map(([categoryName, specs]) => {
                                    return (
                                        <div key={categoryName} className='specCategory'>
                                            <h5 className='SpecCategoryName'>{categoryName}</h5>
                                            {specs.map((spec) => {
                                                return (
                                                    Object.entries(spec).map(([specName, specValue]) => {
                                                        if (typeof specValue === 'string' && specValue.includes('\n')) {
                                                            const lines = specValue.split('\n');
                                                            return (
                                                                <div key={specName} className='Spec'>
                                                                    <h6 className='SpecName'>{specName}</h6>
                                                                    <div className='SpecValue'>
                                                                        {lines.map((line, index) => (
                                                                            <ul>
                                                                                <li key={index}>{line}</li>
                                                                            </ul>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div className="Spec" key={specName}>
                                                                    <h6 className='SpecName'>{specName}</h6>
                                                                    <span className='SpecValue'>{specValue}</span>
                                                                </div>
                                                            );
                                                        }
                                                    })
                                                );
                                            })}
                                        </div>
                                    )
                                })
                            )
                        })
                    }




                </div>
            </div>
        </div>
    )
}
