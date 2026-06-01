import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserCertificates } from '../../api/certificateApi';

function MyCertificates() {
  const { user } = useContext(AuthContext);
    console.log(user);

  

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

 useEffect(() => {
  if (user?.id) {
    fetchCertificates();
  }
}, [user]);

  const fetchCertificates = async () => {
    try {
      const data =
await getUserCertificates(user?.id);
      setCertificates(data);
    } catch (error) {
      console.error(
        'Error fetching certificates:',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading certificates...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        My Certificates
      </h2>

      {certificates.length === 0 ? (
        <p>
          No certificates earned yet.
        </p>
      ) : (
        <div className="row">
          {certificates.map((certificate) => (
            <div
              className="col-md-4 mb-4"
              key={certificate.id}
            >
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>
                    {
                      certificate.course.title
                    }
                  </h5>

                  <p>
                    Issued On:{' '}
                    {new Date(
                      certificate.issuedAt,
                    ).toLocaleDateString()}
                  </p>

                  <a
  href={`http://localhost:3000/certificates/download/${certificate.id}`}
  target="_blank"
  rel="noreferrer"
  className="btn btn-success"
>
  Download Certificate
</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCertificates;
