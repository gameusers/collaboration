// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// ---------------------------------------------
//   Title
// ---------------------------------------------

const StyledDialogContent = styled(DialogContent)`
  && {
    margin: 90px 0 0 0;
  }
`;

const StyledH3 = styled.h3`
  font-size: 16px;
  line-height: 1.6em;
  margin: 30px 0 10px 0;
`;

const StyledP = styled.p`
  font-size: 14px;
  line-height: 1.6em;
  margin: 0 0 10px 0;
`;

const StyledOl = styled.ol`
  font-size: 14px;
  line-height: 1.6em;
  // list-style-type: decimal;
  margin: 20px 0 20px 20px;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    
    // ---------------------------------------------
    //   Dialog
    // ---------------------------------------------
    
    const {
      
      termsOfServiceDialogOpen,
      handleTermsOfServiceDialogClose
      
    } = stores.layout;
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Dialog
        open={termsOfServiceDialogOpen}
        onClose={handleTermsOfServiceDialogClose}
        fullScreen
      >
        
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={handleTermsOfServiceDialogClose} aria-label="Close">
              <IconClose />
            </IconButton>
            <Typography variant="h6" color="inherit">
              利用規約
            </Typography>
          </Toolbar>
        </AppBar>
        
        
        <StyledDialogContent>
          
          <StyledP>
            この利用規約（以下、「本規約」といいます。）は、Game Usersがこのウェブサイト、アプリケーション上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。利用ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </StyledP>
          
          
          
          <StyledH3>第1条（適用）</StyledH3>
          
          <StyledP>
            本規約は、ユーザーとGame Usersとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </StyledP>
          
          
          
          <StyledH3>第2条（利用登録）</StyledH3>
          
          <StyledP>
            登録希望者がGame Usersの定める方法によって利用登録を申請し、Game Usersがこれを承認することによって、利用登録が完了するものとします。
          </StyledP>
          
          <StyledP>
            Game Usersは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
          </StyledP>
          
          <StyledOl>
            <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
            <li>本規約に違反したことがある者からの申請である場合</li>
            <li>反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力との何らかの交流もしくは関与を行っているとGame Usersが判断した場合</li>
            <li>その他、Game Usersが利用登録を相当でないと判断した場合</li>
          </StyledOl>
          
          
          
          <StyledH3>第3条（ユーザーIDおよびパスワードの管理）</StyledH3>
          
          <StyledP>
            ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを管理するものとします。
          </StyledP>
          
          <StyledP>
            ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。Game Usersは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
          </StyledP>
          
          
          
          <StyledH3>第4条（禁止事項）</StyledH3>
          
          <StyledP>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </StyledP>
          
          <StyledOl>
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>Game Usersのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
            <li>Game Usersのサービスの運営を妨害するおそれのある行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>Game Usersのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>Game Users、本サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
            <li>過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、その他反社会的な内容を含み他人に不快感を与える表現を、投稿または送信する行為</li>
            <li>営業、宣伝、広告、勧誘、その他営利を目的とする行為（Game Usersの認めたものを除きます。）、性行為やわいせつな行為を目的とする行為、面識のない異性との出会いや交際を目的とする行為、他のお客様に対する嫌がらせや誹謗中傷を目的とする行為、その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為</li>
            <li>宗教活動または宗教団体への勧誘行為</li>
            <li>その他、Game Usersが不適切と判断する行為</li>
          </StyledOl>
          
          
          
          <StyledH3>第5条（本サービスの提供の停止等）</StyledH3>
          
          <StyledP>
            Game Usersは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          </StyledP>
          
          <StyledOl>
            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li>コンピュータまたは通信回線等が事故により停止した場合</li>
            <li>その他、Game Usersが本サービスの提供が困難と判断した場合</li>
          </StyledOl>
          
          <StyledP>
            Game Usersは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。
          </StyledP>
          
          
          
          <StyledH3>第6条（著作権）</StyledH3>
          
          <StyledP>
            ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報のみ、本サービスを利用し、投稿または編集することができるものとします。
          </StyledP>
          
          <StyledP>
            ユーザーが本サービスを利用して投稿または編集した文章、画像、映像等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、Game Usersは、本サービスを利用して投稿または編集された文章、画像、映像等を利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
          </StyledP>
          
          <StyledP>
            前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権はすべてGame UsersまたはGame Usersにその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
          </StyledP>
          
          
          
          <StyledH3>第7条（利用制限および登録抹消）</StyledH3>
          
          <StyledP>
            Game Usersは、以下の場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
          </StyledP>
          
          <StyledOl>
            <li>本規約のいずれかの条項に違反した場合</li>
            <li>登録事項に虚偽の事実があることが判明した場合</li>
            <li>破産、民事再生、会社更生または特別清算の手続開始決定等の申立がなされたとき</li>
            <li>1年間以上本サービスの利用がない場合</li>
            <li>Game Usersからの問い合わせ、その他の回答を求める連絡に対して30日間以上応答がない場合</li>
            <li>第2条各号に該当する場合</li>
            <li>その他、Game Usersが本サービスの利用を適当でないと判断した場合</li>
          </StyledOl>
          
          <StyledP>
            前項各号のいずれかに該当した場合、ユーザーは、当然にGame Usersに対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
          </StyledP>
          
          <StyledP>
            Game Usersは、本条に基づきGame Usersが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
          </StyledP>
          
          
          
          <StyledH3>第8条（保証の否認および免責事項）</StyledH3>
          
          <StyledP>
            Game Usersは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </StyledP>
          
          <StyledP>
            Game Usersは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関するGame Usersとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
          </StyledP>
          
          <StyledP>
            前項ただし書に定める場合であっても、Game Usersは、Game Usersの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（Game Usersまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、Game Usersの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
          </StyledP>
          
          <StyledP>
            Game Usersは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
          </StyledP>
          
          
          
          <StyledH3>第9条（サービス内容の変更等）</StyledH3>
          
          <StyledP>
            Game Usersは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </StyledP>
          
          
          
          <StyledH3>第10条（利用規約の変更）</StyledH3>
          
          <StyledP>
            Game Usersは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
          </StyledP>
          
          
          
          <StyledH3>第11条（通知または連絡）</StyledH3>
          
          <StyledP>
            ユーザーとGame Usersとの間の通知または連絡は、Game Usersの定める方法によって行うものとします。
          </StyledP>
          
          
          
          <StyledH3>第12条（権利義務の譲渡の禁止）</StyledH3>
          
          <StyledP>
            ユーザーは、Game Usersの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
          </StyledP>
          
          
          
          <StyledH3>第13条（準拠法・裁判管轄）</StyledH3>
          
          <StyledP>
            本規約の解釈にあたっては、日本法を準拠法とします。
          </StyledP>
          
          <StyledP>
            本サービスに関して紛争が生じた場合には、Game Usersの運営者所在地を管轄する裁判所を専属的合意管轄とします。
          </StyledP>
          
        </StyledDialogContent>
      </Dialog>
    );
    
  }
  
};