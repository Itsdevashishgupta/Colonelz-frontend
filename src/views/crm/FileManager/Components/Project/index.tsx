import React, { useEffect, useState } from 'react'
import { FolderItem,fetchProjectData} from './data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Dialog } from '@/components/ui';

import type { MouseEvent } from 'react'
import YourFormComponent from './ProjectForm';


const Index = () => {
    const [projectData, setProjectData] = useState<FolderItem[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get('project_id');
    useEffect(() => {
      const fetchDataAndLog = async () => {
        try {
          const projectData = await fetchProjectData(projectId);
          console.log(projectData);
          setProjectData(projectData[0].files);
        } catch (error) {
          console.error('Error fetching lead data', error);
        }
      };
  
      fetchDataAndLog();
    }, []);
    const navigate=useNavigate()


    const [dialogIsOpen, setIsOpen] = useState(false)

   const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }


  return (
    <div>
     <div className=' mb-5 flex justify-between'>
    <h3 className=''>Folder</h3>
    <Button variant='solid' size='sm' onClick={() => openDialog()}>Upload</Button>
    </div>
    <div className='grid grid-cols-4 gap-3'>
        {projectData.map((item)=>(
           <Card key={item.folder_name} className=' cursor-pointer' onClick={()=>navigate(`/app/crm/fileManager/project/folder?project_id=${projectId}&folder_name=${item.folder_name}`)}>
            <p className=' capitalize'>{item.folder_name}</p>
           </Card>
        ))}
    </div>
    <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
              <YourFormComponent/> 
            </Dialog>
    </div>
  )
}

export default Index