import { useState } from 'react';
import axios from 'axios';

const CustomerAdd = () => {
  const [File, setFile] = useState(null);
  const [Name, setName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Gender, setGender] = useState('');
  const [Job, setJob] = useState('');
  const [FileName, setFileName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer()
      .then((res) => {
        console.log(res.data);
      });

      setFile(null);
      setName('');
      setBirthday('');
      setGender('');
      setJob('');
      setFileName('');
  }
  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', File);
    formData.append('name', Name);
    formData.append('birthday', Birthday);
    formData.append('gender', Gender);
    formData.append('job', Job);
    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData, config);
  }


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
    // console.log(File);
    // console.log(FileName);
  }
  const handleValueChange = (e) => {
    switch(e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'birthday':
        setBirthday(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'job':
        setJob(e.target.value);
        break;
      default : break;
    }
    // console.log(e.target.name,':', e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name="file" file={File} value={FileName} onChange={handleFileChange}/><br/>
        이름: <input type="text" name="name" value={Name} onChange={handleValueChange}/><br/>
        생년월일: <input type="text" name="birthday" value={Birthday} onChange={handleValueChange}/><br/>
        성별: <input type="text" name="gender" value={Gender} onChange={handleValueChange}/><br/>
        직업: <input type="text" name="job" value={Job} onChange={handleValueChange}/><br/>
        <button type="submit">추가</button>
      </form>
    </div>
  )
}

export default CustomerAdd;