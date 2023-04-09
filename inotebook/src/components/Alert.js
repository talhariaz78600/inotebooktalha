import React from 'react';

function Alert() {
  return (
    <div>
        <div className="container">
            <div className="row">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Alert
