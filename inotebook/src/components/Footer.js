import React from 'react';

export default function Footer(props) {
  return (
        <div className="container mt-2 fixed-bottom bg-light p-0">
            <div className="row">
                <div className="col-12 border">
                <div className={`bg-${props.mode==='light'?'light':'dark'}`} >
                <p className={`text-${props.mode==='light'?'primary':'white'} text-center`}>Copyright © 2023 codejtr.com</p>
                </div>

                </div>

            </div>
        </div>
  );
}
