import * as React from 'react';
import cn from 'classnames';

export function Footer() {
  return (
    <footer className={cn('text-secondary dark:text-secondary-dark')}>
      <div className="gap-x-12 gap-y-8 max-w-7xl mx-auto">
        <div className="text-xs text-left rtl:text-right mt-2 pe-0.5" dir="ltr">
          お問合せ先：{' '}
          <a
            className="sp-error-message"
            href="mailto:open-garden@googlegroups.com">
            open-garden@googlegroups.com
          </a>
          <br />
          <a
            className="sp-error-message"
            href="mailto:open-garden@googlegroups.com">
            open-garden@googlegroups.com
          </a>{' '}
          宛にお問い合わせ頂いた内容については、開発者である株式会社NTTデータオートモビリジェンス研究所にて内容を確認のうえ、ご回答させて頂きます。
          <br />
          お問合せ頂きました情報は、匿名の情報として、GARDEN
          ScenarioPlatformの発展を目的に使用されます。
          <br />
          Notice : The content of your inquiry will be shared with NTT DATA
          Automobiligence Research Center, Ltd.
        </div>
      </div>
    </footer>
  );
}
