'use strict';
export default () => {
  type signature = {
    [key: string]: any;
    [key: number]: any;
  };
  /**
   * 숫자 자릿수찍기
   * useNumberComma(data)
   * @param {*} data
   */
  const numberComma = (data: string | number): string => (!isEmpty(data) ? Number(data).toLocaleString(navigator.language) : String(0));

  /**
   * 10미만 숫자 앞에 0붙이기
   * useNumberAddZero(data)
   * @param {*} data
   */
  const numberAddZero = (data: string | number): string => (Number(data) < 10 ? `0${data}` : String(data));

  /**
   * 데이터 unescape처리
   * unescapeString(data)
   * @param {*} data
   */
  const unescapeString = (data: string): string => (!isEmpty(data) ? String(new DOMParser().parseFromString(data, 'text/html').documentElement.textContent) : '');

  /**
   * no image 처리
   * noImage($event)
   * @param {*} e
   */
  const noImage = (e: any): void => {
    e.target.src = '/images/common/no_image.png';
  };

  /**
   * 화면 위치지정
   * useWindowPosition(object)
   * @param {*} data
   */
  const windowPosition = (data: object): void => {
    if (data.constructor !== Object) {
      throw 'parameter is not object';
    }

    window.scrollTo({ ...data, behavior: 'smooth' });
  };

  /**
   * 데이터 empty 여부
   * isEmpty(data)
   * @param {*} data
   * @Return true : 비었다, false : 데이터가 있다.
   */
  const isEmpty = (data: any): boolean => {
    let bool = true;

    if (data !== undefined && data !== null) {
      switch (data.constructor) {
        case String:
          const str = data.replace(/[\s|\t]/gi, '');
          if (str !== 'null' && str.length > 0) {
            bool = false;
          }
          break;
        case Array:
          if (data.length > 0) {
            bool = false;
          }
          break;
        case Object:
          if (Object.keys(data).length > 0) {
            bool = false;
          }
          break;
        case Date:
          bool = false;
          break;
        case Number:
          bool = false;
          break;
        case Boolean:
          bool = false;
          break;
      }
    }

    return bool;
  };

  /**
   * 객체 특정 프로퍼티 존재유무 판단
   * @param {*} object
   * @param {*} target
   * @returns true : 존재, false : 없음
   */
  const hasObjectProperty = (object: object, target: string): boolean => (!isEmpty(object) ? Object.hasOwnProperty.call(object, target) : false);

  /**
   * html 문자열 랜더링(v-html을 사용할수 없을때 ex> script가 포함되어있을때)
   * ※ onMounted에서 쓸수있다.
   * @param {*} target document.getElementById or id string
   * @param {*} data string
   * @param {*} isUnescape
   */
  const renderHTML = (target: any, data: string, isUnescape: boolean = true) => {
    const htmlString = isUnescape ? unescapeString(data) : data;
    const parser = new DOMParser().parseFromString(htmlString, 'text/html').documentElement;
    const elArr = [...parser.children];
    const length = elArr.length;

    if (target.constructor === String) {
      target = document.getElementById(target.toString());
    }

    parent: for (let i = 0; i < length; i++) {
      const el = elArr[i];

      if (el.children.length > 0) {
        if (!findListSearch(['head', 'body'], el.localName)) {
          continue;
        }

        const childArr = [...el.children];
        const childLength = childArr.length;

        children: for (let j = 0; j < childLength; j++) {
          const elChild = childArr[j];

          if ([...elChild.children].map((child) => child.localName).includes('script')) {
            target.insertAdjacentElement('afterbegin', elChild);
            renderHTML(elChild, elChild.innerHTML, false);
          } else {
            if (elChild.localName !== 'script') {
              target.insertAdjacentElement('afterbegin', elChild);
            } else {
              const script = document.createElement('script');

              script.textContent = elChild.textContent;
              target.insertAdjacentElement('afterbegin', script);
            }
          }
        }
      }
    }
  };

  /**
   * 원시값(int, string, float...) 리스트 요소 찾기
   * @param {*} list
   * @param {*} findData
   */
  const findListSearch = (list: Array<string | number>, findData: string | number): boolean => {
    const SORT_LIST = list.sort((a, b) => (a === b ? 0 : a < b ? -1 : 1));
    let isExists = false;
    let left = 0;
    let right = SORT_LIST.length - 1;

    for (let i = 0, size = SORT_LIST.length; i < size; i++) {
      let mid = Math.floor((left + right) / 2);

      if (SORT_LIST[mid] === findData) {
        isExists = true;
        break;
      } else if (SORT_LIST[mid] < findData) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return isExists;
  };

  /**
   * object change form data
   * @param {*} data
   */
  const changeToFormData = (data: signature): FormData => {
    const form = new FormData();
    const keyList = Object.keys(data);

    for (let i = 0, length = keyList.length; i < length; i++) {
      const key = keyList[i];
      const value = data[key];

      form.append(key, value);
    }

    return form;
  };

  /**
   * file upload function
   * @param {*} url
   * @param {*} renderTarget
   * @returns
   */
  const fileUpload = (url: string, isRender: boolean = false, renderTarget: string = ''): object => {
    const sendServerUrl = url;
    const fileObject: signature = {};
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

          if (!Object.prototype.hasOwnProperty.call(fileObject, lastModified) || fileObject[lastModified] === undefined) {
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
      const checkedList: signature = [...document.getElementsByName('fileCheckBox')].filter((item: any) => item.checked);

      for (let i = 0, size = checkedList.length; i < size; i++) {
        const lastModified = checkedList[i].value;

        if (Object.prototype.hasOwnProperty.call(fileObject, lastModified)) {
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

  const scrollHandler = (func: any) => {
    if (func.constructor === Function) {
      window.addEventListener('scroll', (e) => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight >= fullHeight) {
          func();
        }
      });
    }
  };

  return {
    isEmpty,
    hasObjectProperty,
    changeToFormData,
    numberComma,
    findListSearch,
    renderHTML,
    windowPosition,
    numberAddZero,
    fileUpload,
    scrollHandler,
  };
};
