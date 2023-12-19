import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

export default function Header() {

  //!! FOR TESTING LOCALIZATION (WILL FIX IT LATER)
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: any) => {
      i18n.changeLanguage(lng);
    };
    return (
      <div className="App">
        <header className="App-header">
          <p>{t('title')}</p>
          <button className="btn" onClick={() => changeLanguage('en')}>english</button>
          <button className="btn" onClick={() => changeLanguage('ar')}>arabic</button>
        </header>
      </div>
    );
  }