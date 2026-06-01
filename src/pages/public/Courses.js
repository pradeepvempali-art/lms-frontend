import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
const [levelFilter, setLevelFilter] = useState('ALL');
const [priceFilter, setPriceFilter] = useState('ALL');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
  (course) => {
    const matchesSearch =
      course.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase(),
        );

    const matchesLevel =
      levelFilter === 'ALL'
        ? true
        : course.level ===
          levelFilter;

    const matchesPrice =
      priceFilter === 'ALL'
        ? true
        : priceFilter === 'FREE'
        ? course.price === 0
        : course.price > 0;

    return (
      matchesSearch &&
      matchesLevel &&
      matchesPrice
    );
  },
);
  if (loading) {

    
    return (
      <div className="container mt-5">
        <h3>Loading courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Courses</h2>

      <div className="row mb-4">
  {/* Search */}
  <div className="col-md-4 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="Search courses..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />
  </div>

  {/* Level Filter */}
  <div className="col-md-4 mb-2">
    <select
      className="form-select"
      value={levelFilter}
      onChange={(e) =>
        setLevelFilter(e.target.value)
      }
    >
      <option value="ALL">
        All Levels
      </option>

      <option value="BEGINNER">
        Beginner
      </option>

      <option value="INTERMEDIATE">
        Intermediate
      </option>

      <option value="ADVANCED">
        Advanced
      </option>
    </select>
  </div>

  {/* Price Filter */}
  <div className="col-md-4 mb-2">
    <select
      className="form-select"
      value={priceFilter}
      onChange={(e) =>
        setPriceFilter(e.target.value)
      }
    >
      <option value="ALL">
        All Courses
      </option>

      <option value="FREE">
        Free Courses
      </option>

      <option value="PAID">
        Paid Courses
      </option>
    </select>
  </div>
</div>

{filteredCourses.length === 0 && (
  <div className="alert alert-warning">
    No courses found.
  </div>
)}
      <div className="row">
{filteredCourses.map((course) => (
            <div className="col-md-4 mb-4" key={course.id}>
            <div className="card h-100 shadow">

              <img
    src={course.thumbnail}
    alt={course.title}
    className="card-img-top"
    style={{
      height: '200px',
      objectFit: 'cover',
    }}
  />
              
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/courses/${course.slug}`}
                    className="text-decoration-none"
                  >
                    {course.title}
                  </Link>
                </h5>

                <p className="card-text">
                  {course.description}
                </p>

                <p>
                  <strong>Price:</strong> ₹{course.price}
                </p>

                <p>
                  <strong>Level:</strong> {course.level}
                </p>

                <p>
                  <strong>Status:</strong> {course.status}
                </p>

                <Link
                  to={`/courses/${course.slug}`}
                  className="btn btn-primary w-100"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;