import type { KeyObject } from '~/@types/global-type';

/**
 * file upload function
 * @param {*} url
 * @param {*} renderTarget
 * @returns
 */
export const fileUpload = (url: string, isRender: boolean = false, renderTarget: string = ''): object => {
  const sendServerUrl = url;
  const fileObject: KeyObject = {};
  let dropZone = document.getElementById('dropBox') as HTMLElement;
  let uploadBtn = document.getElementById('uploadBtn') as HTMLButtonElement;
  let deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;
  let inputFile = document.getElementById('fileUpload') as HTMLInputElement;

  const transferDataSize = (size: number) => (size > 1048576 ? (size / 1048576).toFixed(2) + 'MB' : (size / 1024).toFixed(2) + 'KB');
  const validateFile = (files: FileList) => {
    let flag = true;
    const FILE_MAX_SIZE = 52428800;

    if ([...files].map((file) => file.size).reduce((acc, cur) => acc + cur) > FILE_MAX_SIZE) {
      alert('최대 업로드는 50MB입니다.');
      flag = false;
    }

    if (flag) {
      for (let i = 0, size = files.length; i < size; i++) {
        const file = files[i];
        const extRegex = /html|html|jsp|asp|lnk|exe/gi;
        const fileExt = String(file.name)
          .substring(file.name.lastIndexOf('.') + 1, file.name.length)
          .toLocaleLowerCase();

        if (extRegex.test(fileExt)) {
          alert('첨부할수없는 확장자입니다.');
          flag = false;
          break;
        }
        if (file.size > FILE_MAX_SIZE) {
          alert('50MB이상 파일은 첨부할 수 없습니다.');
          flag = false;
          break;
        }
        if (file.name.lastIndexOf('.') === -1) {
          alert('폴더는 첨부할 수 없습니다.\n압축해서 첨부해주세요.');
          flag = false;
          break;
        }
        if (document.getElementsByName('fileCheckBox').length + files.length > 5) {
          alert('최대 5개까지 등록 가능합니다.');
          flag = false;
          break;
        }
      }
    }

    return flag;
  };
  const renderHTML = (file: File) => {
    let html = '';

    html += `<div id="area_${file.lastModified}">`;
    html += `   <input type="checkbox" name="fileCheckBox" id="chk_${file.lastModified}" value="${file.lastModified}">`;
    html += `   <label for="chk_${file.lastModified}">${file.name}</label>`;
    html += `	&emsp;&emsp;`;
    html += `    <span class="fileSize" style="float: right;">${transferDataSize(file.size)}</span>`;
    html += `</div>`;

    dropZone.insertAdjacentHTML('beforeend', html);
  };
  const setFile = (files: FileList) => {
    if (validateFile(files)) {
      for (let i = 0, size = files.length; i < size; i++) {
        const lastModified = files[i].lastModified;

        if (!Object.hasOwn(fileObject, lastModified) || fileObject[lastModified] === undefined) {
          fileObject[files[i].lastModified] = files[i];
          renderHTML(files[i]);
        }
      }
    }
  };
  const uploadFile = (e: any) => {
    setFile(e.target.files);
    e.target.value = null;
  };
  const deleteFile = () => {
    const checkedList: Array<HTMLElement> = [...document.getElementsByName('fileCheckBox')].filter((item: any) => item.checked);

    for (let i = 0, size = checkedList.length; i < size; i++) {
      const lastModified = (checkedList[i] as HTMLInputElement).value;

      if (Object.hasOwn(fileObject, lastModified)) {
        fileObject[lastModified] = undefined;
        const el = document.getElementById(`area_${lastModified}`) as HTMLElement;
        el.remove();
      }
    }
  };
  const sendServerFile = async () => {
    const fileList: Array<File> = Object.keys(fileObject)
      .filter((key: string) => !isEmpty(fileObject[key]))
      .map((key: string): File => fileObject[key]);
    const formData = new FormData();

    if (fileList.length > 0) {
      fileList.forEach((file: File): void => formData.append('fileList[]', file));

      await fetch(sendServerUrl, {
        headers: {},
        method: 'post',
        body: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else {
      alert('업로드할 파일이 없습니다.');
      return false;
    }
  };

  const dragFile = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'text';
  };
  const dropFile = (e: any) => {
    e.preventDefault();
    setFile(e.dataTransfer.files);
  };

  const bindEvent = () => {
    inputFile.addEventListener('change', uploadFile);
    uploadBtn.addEventListener('click', sendServerFile);
    deleteBtn.addEventListener('click', deleteFile);
    dropZone.addEventListener('dragover', dragFile);
    dropZone.addEventListener('drop', dropFile);
  };
  const isExcute = () => {
    if (isRender) {
      const elList: Array<HTMLElement> = [inputFile, dropZone, uploadBtn, deleteBtn] as Array<HTMLElement>;

      if (elList.filter((item: HTMLElement) => isEmpty(item)).length > 0) {
        if (renderTarget === '') {
          throw 'please renderTarget element string.';
        }
        if (document.getElementById(renderTarget) === null) {
          throw 'renderTarget element is not id.';
        }
      }

      if (inputFile === null) {
        inputFile = document.createElement('input');
        inputFile.name = 'fileUpload';
        inputFile.id = 'fileUpload';
        inputFile.setAttribute('type', 'file');
        inputFile.setAttribute('multiple', '');
        inputFile.style.width = '75px';
        inputFile.style.overflow = 'hidden';

        const element = document.getElementById(renderTarget) as HTMLElement;
        element.insertAdjacentElement('beforeend', inputFile);
      }
      if (dropZone === null) {
        dropZone = document.createElement('div');
        dropZone.setAttribute('id', 'dropBox');
        dropZone.style.width = '800px';
        dropZone.style.height = '300px';
        dropZone.style.border = '1px solid skyblue';

        const element = document.getElementById(renderTarget) as HTMLElement;
        element.insertAdjacentElement('beforeend', dropZone);
      }
      if (uploadBtn === null) {
        uploadBtn = document.createElement('button');
        uploadBtn.name = 'uploadBtn';
        uploadBtn.id = 'uploadBtn';
        uploadBtn.textContent = '업로드';

        const element = document.getElementById(renderTarget) as HTMLElement;
        element.insertAdjacentElement('beforeend', uploadBtn);
      }
      if (deleteBtn === null) {
        deleteBtn = document.createElement('button');
        deleteBtn.name = 'deleteBtn';
        deleteBtn.id = 'deleteBtn';
        deleteBtn.textContent = '삭제';

        const element = document.getElementById(renderTarget) as HTMLElement;
        element.insertAdjacentElement('beforeend', deleteBtn);
      }
    }
  };

  return {
    excuteFileUpload: () =>
      Promise.resolve()
        .then(() => isExcute())
        .then(() => bindEvent())
        .catch((error) => console.log(error)),
  };
};
