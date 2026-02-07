// 樊振东职业生涯完整冠军数据
export interface Champion {
  year: number;
  event: string;
  category: string;
  type: 'singles' | 'team' | 'doubles' | 'mixed';
  location: string;
  opponent?: string;
  score?: string;
  partner?: string;
}

export const allChampionsData: Champion[] = [
  // ==================== 奥运会 ====================
  { year: 2024, event: '巴黎奥运会', category: 'olympics', type: 'singles', location: '法国巴黎', opponent: '莫雷高德(瑞典)', score: '4-1' },
  { year: 2024, event: '巴黎奥运会', category: 'olympics', type: 'team', location: '法国巴黎', opponent: '瑞典', score: '3-0' },
  { year: 2021, event: '东京奥运会', category: 'olympics', type: 'team', location: '日本东京', opponent: '德国', score: '3-1' },
  
  // ==================== 世锦赛 ====================
  { year: 2024, event: '釜山团体世乒赛', category: 'world-championship', type: 'team', location: '韩国釜山', opponent: '法国', score: '3-0' },
  { year: 2023, event: '德班世乒赛', category: 'world-championship', type: 'singles', location: '南非德班', opponent: '王楚钦', score: '4-2' },
  { year: 2023, event: '德班世乒赛', category: 'world-championship', type: 'doubles', location: '南非德班', opponent: '张禹珍/林钟勋(韩国)', score: '3-0', partner: '王楚钦' },
  { year: 2022, event: '成都团体世乒赛', category: 'world-championship', type: 'team', location: '中国成都', opponent: '德国', score: '3-0' },
  { year: 2021, event: '休斯顿世乒赛', category: 'world-championship', type: 'singles', location: '美国休斯顿', opponent: '莫雷高德(瑞典)', score: '4-0' },
  { year: 2018, event: '哈尔姆斯塔德团体世乒赛', category: 'world-championship', type: 'team', location: '瑞典哈尔姆斯塔德', opponent: '德国', score: '3-0' },
  { year: 2017, event: '杜塞尔多夫世乒赛', category: 'world-championship', type: 'doubles', location: '德国杜塞尔多夫', opponent: '森园政崇/大岛佑哉(日本)', score: '4-1', partner: '许昕' },
  { year: 2016, event: '吉隆坡团体世乒赛', category: 'world-championship', type: 'team', location: '马来西亚吉隆坡', opponent: '日本', score: '3-0' },
  { year: 2014, event: '东京团体世乒赛', category: 'world-championship', type: 'team', location: '日本东京', opponent: '德国', score: '3-0' },
  
  // ==================== 世界杯 ====================
  { year: 2023, event: '混合团体世界杯', category: 'world-cup', type: 'team', location: '中国成都', opponent: '韩国', score: '8-1' },
  { year: 2020, event: '男子世界杯', category: 'world-cup', type: 'singles', location: '中国威海', opponent: '马龙', score: '4-3' },
  { year: 2019, event: '男子世界杯', category: 'world-cup', type: 'singles', location: '中国成都', opponent: '张本智和(日本)', score: '4-2' },
  { year: 2019, event: '团体世界杯', category: 'world-cup', type: 'team', location: '日本东京', opponent: '韩国', score: '3-0' },
  { year: 2018, event: '男子世界杯', category: 'world-cup', type: 'singles', location: '法国巴黎', opponent: '波尔(德国)', score: '4-1' },
  { year: 2018, event: '团体世界杯', category: 'world-cup', type: 'team', location: '英国伦敦', opponent: '日本', score: '3-0' },
  { year: 2016, event: '男子世界杯', category: 'world-cup', type: 'singles', location: '德国萨尔布吕肯', opponent: '许昕', score: '4-1' },
  { year: 2015, event: '团体世界杯', category: 'world-cup', type: 'team', location: '阿联酋迪拜', opponent: '奥地利', score: '3-0' },
  
  // ==================== ITTF总决赛 ====================
  { year: 2019, event: 'ITTF总决赛', category: 'ittf-finals', type: 'singles', location: '中国郑州', opponent: '马龙', score: '4-1' },
  { year: 2019, event: 'ITTF总决赛', category: 'ittf-finals', type: 'doubles', location: '中国郑州', opponent: '廖振珽/林昀儒(中国台北)', score: '3-1', partner: '许昕' },
  { year: 2017, event: 'ITTF总决赛', category: 'ittf-finals', type: 'singles', location: '哈萨克斯坦阿斯塔纳', opponent: '奥恰洛夫(德国)', score: '4-0' },
  
  // ==================== 亚运会 ====================
  { year: 2023, event: '杭州亚运会', category: 'asian-games', type: 'team', location: '中国杭州', opponent: '韩国', score: '3-0' },
  { year: 2023, event: '杭州亚运会', category: 'asian-games', type: 'doubles', location: '中国杭州', opponent: '张禹珍/林钟勋(韩国)', score: '4-0', partner: '王楚钦' },
  { year: 2018, event: '雅加达亚运会', category: 'asian-games', type: 'singles', location: '印尼雅加达', opponent: '林高远', score: '4-2' },
  { year: 2018, event: '雅加达亚运会', category: 'asian-games', type: 'team', location: '印尼雅加达', opponent: '韩国', score: '3-0' },
  { year: 2014, event: '仁川亚运会', category: 'asian-games', type: 'team', location: '韩国仁川', opponent: '韩国', score: '3-0' },
  
  // ==================== 亚锦赛 ====================
  { year: 2023, event: '平昌亚锦赛', category: 'asian-championship', type: 'team', location: '韩国平昌', opponent: '中国台北', score: '3-0' },
  { year: 2023, event: '平昌亚锦赛', category: 'asian-championship', type: 'doubles', location: '韩国平昌', opponent: '马龙/王楚钦', score: '3-2', partner: '林高远' },
  { year: 2019, event: '日惹亚锦赛', category: 'asian-championship', type: 'team', location: '印尼日惹', opponent: '韩国', score: '3-0' },
  { year: 2017, event: '无锡亚锦赛', category: 'asian-championship', type: 'singles', location: '中国无锡', opponent: '丁祥恩(韩国)', score: '3-0' },
  { year: 2017, event: '无锡亚锦赛', category: 'asian-championship', type: 'team', location: '中国无锡', opponent: '韩国', score: '3-0' },
  { year: 2017, event: '无锡亚锦赛', category: 'asian-championship', type: 'doubles', location: '中国无锡', opponent: '方博/周雨', score: '3-1', partner: '林高远' },
  { year: 2015, event: '芭堤雅亚锦赛', category: 'asian-championship', type: 'singles', location: '泰国芭堤雅', opponent: '许昕', score: '4-3' },
  { year: 2015, event: '芭堤雅亚锦赛', category: 'asian-championship', type: 'team', location: '泰国芭堤雅', opponent: '日本', score: '3-0' },
  { year: 2015, event: '芭堤雅亚锦赛', category: 'asian-championship', type: 'doubles', location: '泰国芭堤雅', opponent: '郑荣植/李尚洙(韩国)', score: '4-0', partner: '许昕' },
  { year: 2015, event: '芭堤雅亚锦赛', category: 'asian-championship', type: 'mixed', location: '泰国芭堤雅', opponent: '杨子/于梦雨(新加坡)', score: '4-0', partner: '陈梦' },
  { year: 2013, event: '釜山亚锦赛', category: 'asian-championship', type: 'team', location: '韩国釜山', opponent: '日本', score: '3-0' },
  
  // ==================== 亚洲杯 ====================
  { year: 2019, event: '亚洲杯', category: 'asian-cup', type: 'singles', location: '日本横滨', opponent: '马龙', score: '4-2' },
  { year: 2018, event: '亚洲杯', category: 'asian-cup', type: 'singles', location: '日本横滨', opponent: '林高远', score: '4-0' },
  
  // ==================== 全运会 ====================
  { year: 2025, event: '全运会', category: 'national-games', type: 'singles', location: '中国澳门', opponent: '林诗栋', score: '4-1' },
  { year: 2021, event: '全运会', category: 'national-games', type: 'singles', location: '中国陕西', opponent: '刘丁硕', score: '4-0' },
  { year: 2021, event: '全运会', category: 'national-games', type: 'team', location: '中国陕西', opponent: '北京', score: '3-1' },
  { year: 2017, event: '全运会', category: 'national-games', type: 'doubles', location: '中国天津', opponent: '马龙/许昕', score: '4-3', partner: '周雨' },
  { year: 2013, event: '全运会', category: 'national-games', type: 'team', location: '中国辽宁', opponent: '-', score: '-' },
  { year: 2013, event: '全运会', category: 'national-games', type: 'doubles', location: '中国辽宁', opponent: '李木桥/尹航', score: '4-0', partner: '周雨' },
  
  // ==================== 全锦赛 ====================
  { year: 2024, event: '全锦赛', category: 'national-championship', type: 'team', location: '内蒙古鄂尔多斯', opponent: '黑龙江', score: '-' },
  { year: 2023, event: '全锦赛', category: 'national-championship', type: 'team', location: '江苏扬州', opponent: '浙江', score: '-' },
  { year: 2022, event: '全锦赛', category: 'national-championship', type: 'singles', location: '湖北黄石', opponent: '林高远', score: '4-2' },
  { year: 2022, event: '全锦赛', category: 'national-championship', type: 'team', location: '湖北黄石', opponent: '-', score: '-' },
  { year: 2020, event: '全锦赛', category: 'national-championship', type: 'singles', location: '山东威海', opponent: '马龙', score: '4-3' },
  { year: 2016, event: '全锦赛', category: 'national-championship', type: 'singles', location: '辽宁鞍山', opponent: '-', score: '-' },
  { year: 2014, event: '全锦赛', category: 'national-championship', type: 'singles', location: '湖北黄石', opponent: '马龙', score: '4-2' },
  { year: 2014, event: '全锦赛', category: 'national-championship', type: 'doubles', location: '湖北黄石', opponent: '张继科/马龙', score: '4-2', partner: '许昕' },
  
  // ==================== WTT大满贯 ====================
  { year: 2023, event: 'WTT新加坡大满贯', category: 'wtt-slam', type: 'singles', location: '新加坡', opponent: '马龙', score: '4-1' },
  { year: 2023, event: 'WTT新加坡大满贯', category: 'wtt-slam', type: 'doubles', location: '新加坡', opponent: '张禹珍/林钟勋(韩国)', score: '3-1', partner: '王楚钦' },
  { year: 2022, event: 'WTT新加坡大满贯', category: 'wtt-slam', type: 'singles', location: '新加坡', opponent: '马龙', score: '4-3' },
  { year: 2022, event: 'WTT新加坡大满贯', category: 'wtt-slam', type: 'doubles', location: '新加坡', opponent: '宇田幸矢/户上隼辅(日本)', score: '3-1', partner: '王楚钦' },
  
  // ==================== WTT冠军赛 ====================
  { year: 2024, event: 'WTT重庆冠军赛', category: 'wtt-champions', type: 'singles', location: '中国重庆', opponent: '王楚钦', score: '4-3' },
  { year: 2023, event: 'WTT新乡冠军赛', category: 'wtt-champions', type: 'singles', location: '中国新乡', opponent: '梁靖崑', score: '4-1' },
  { year: 2023, event: 'WTT卢布尔雅那球星赛', category: 'wtt-champions', type: 'singles', location: '斯洛文尼亚', opponent: '王楚钦', score: '4-3' },
  
  // ==================== WTT总决赛 ====================
  { year: 2021, event: 'WTT世界杯总决赛', category: 'wtt-finals', type: 'singles', location: '新加坡', opponent: '张本智和(日本)', score: '4-1' },
  
  // ==================== 德国杯 ====================
  { year: 2026, event: '德国杯', category: 'german-cup', type: 'team', location: '德国新乌尔姆', opponent: '富尔达-马伯策尔', score: '3-1' },
  
  // ==================== 军运会 ====================
  { year: 2019, event: '世界军人运动会', category: 'military-games', type: 'team', location: '中国武汉', opponent: '朝鲜', score: '-' },
  { year: 2019, event: '世界军人运动会', category: 'military-games', type: 'singles', location: '中国武汉', opponent: '郑荣植(韩国)', score: '4-0' },
  { year: 2019, event: '世界军人运动会', category: 'military-games', type: 'doubles', location: '中国武汉', opponent: '周恺/徐晨皓', score: '4-1', partner: '周雨' },
  
  // ==================== 乒超联赛 ====================
  { year: 2016, event: '乒超联赛', category: 'national-championship', type: 'team', location: '中国', opponent: '霸州海润', score: '3-1' },
  
  // ==================== 地表最强12人 ====================
  { year: 2020, event: '地表最强12人', category: '地表最强', type: 'singles', location: '中国', opponent: '-', score: '11战全胜' },
  
  // ==================== 青奥会 ====================
  { year: 2014, event: '南京青奥会', category: 'youth', type: 'singles', location: '中国南京', opponent: '村松雄斗(日本)', score: '4-2' },
  { year: 2014, event: '南京青奥会', category: 'youth', type: 'team', location: '中国南京', opponent: '日本', score: '2-0' },
  
  // ==================== 世青赛 ====================
  { year: 2012, event: '世界青少年锦标赛', category: 'youth', type: 'team', location: '印度海得拉巴', opponent: '日本', score: '-' },
  { year: 2012, event: '世界青少年锦标赛', category: 'youth', type: 'singles', location: '印度海得拉巴', opponent: '林高远', score: '4-2' },
  { year: 2012, event: '世界青少年锦标赛', category: 'youth', type: 'mixed', location: '印度海得拉巴', opponent: '林高远/顾若辰', score: '4-3', partner: '刘高阳' },
  
  // ==================== 亚青赛 ====================
  { year: 2012, event: '亚洲青少年锦标赛', category: 'youth', type: 'team', location: '中国江阴', opponent: '-', score: '-' },
  { year: 2012, event: '亚洲青少年锦标赛', category: 'youth', type: 'singles', location: '中国江阴', opponent: '-', score: '-' },
  { year: 2012, event: '亚洲青少年锦标赛', category: 'youth', type: 'doubles', location: '中国江阴', opponent: '-', score: '-' },
  
  // ==================== 公开赛重要冠军 ====================
  // 2020-2015 巡回赛时代
  { year: 2020, event: '卡塔尔公开赛', category: 'ittf-finals', type: 'singles', location: '卡塔尔多哈', opponent: '皮切福特(英格兰)', score: '4-2' },
  { year: 2019, event: '奥地利公开赛', category: 'ittf-finals', type: 'singles', location: '奥地利林茨', opponent: '赵子豪', score: '4-0' },
  { year: 2019, event: '德国公开赛', category: 'ittf-finals', type: 'singles', location: '德国不来梅', opponent: '许昕', score: '4-1' },
  { year: 2019, event: '韩国公开赛', category: 'ittf-finals', type: 'singles', location: '韩国釜山', opponent: '郑荣植(韩国)', score: '4-0' },
  { year: 2018, event: '瑞典公开赛', category: 'ittf-finals', type: 'singles', location: '瑞典斯德哥尔摩', opponent: '许昕', score: '4-1' },
  { year: 2018, event: '卡塔尔公开赛', category: 'ittf-finals', type: 'singles', location: '卡塔尔多哈', opponent: '卡尔德拉诺(巴西)', score: '4-0' },
  { year: 2018, event: '卡塔尔公开赛', category: 'ittf-finals', type: 'doubles', location: '卡塔尔多哈', opponent: '水谷隼/大岛祐哉(日本)', score: '3-1', partner: '许昕' },
  { year: 2018, event: '匈牙利公开赛', category: 'ittf-finals', type: 'singles', location: '匈牙利布达佩斯', opponent: '王楚钦', score: '4-1' },
  { year: 2018, event: '中国公开赛', category: 'ittf-finals', type: 'doubles', location: '中国深圳', opponent: '伊奥内斯库/罗伯斯', score: '3-0', partner: '林高远' },
  { year: 2017, event: '瑞典公开赛', category: 'ittf-finals', type: 'doubles', location: '瑞典斯德哥尔摩', opponent: '何钧杰/黄镇廷(中国香港)', score: '3-1', partner: '许昕' },
  { year: 2017, event: '中国公开赛', category: 'ittf-finals', type: 'doubles', location: '中国成都', opponent: '张禹珍/丁祥恩(韩国)', score: '3-1', partner: '许昕' },
  { year: 2017, event: '日本公开赛', category: 'ittf-finals', type: 'singles', location: '日本东京', opponent: '马龙', score: '4-1' },
  { year: 2017, event: '亚锦赛', category: 'asian-championship', type: 'singles', location: '中国无锡', opponent: '丁祥恩(韩国)', score: '3-0' },
  { year: 2016, event: '中国公开赛', category: 'ittf-finals', type: 'singles', location: '中国成都', opponent: '马龙', score: '4-0' },
  { year: 2016, event: '日本公开赛', category: 'ittf-finals', type: 'singles', location: '日本东京', opponent: '高茨(法国)', score: '4-1' },
  { year: 2016, event: '波兰公开赛', category: 'ittf-finals', type: 'singles', location: '波兰华沙', opponent: '乔纳森(丹麦)', score: '4-1' },
  { year: 2015, event: '波兰公开赛', category: 'ittf-finals', type: 'singles', location: '波兰华沙', opponent: '奥恰洛夫(德国)', score: '4-1' },
  { year: 2015, event: '瑞典公开赛', category: 'ittf-finals', type: 'singles', location: '瑞典斯德哥尔摩', opponent: '许昕', score: '4-3' },
  { year: 2015, event: '捷克公开赛', category: 'ittf-finals', type: 'singles', location: '捷克奥洛穆茨', opponent: '什巴耶夫(俄罗斯)', score: '4-1' },
  { year: 2015, event: '中国公开赛', category: 'ittf-finals', type: 'singles', location: '中国成都', opponent: '马龙', score: '4-0' },
  { year: 2014, event: '中国公开赛', category: 'ittf-finals', type: 'doubles', location: '中国成都', opponent: '陈建安/江宏杰(中国台北)', score: '3-1', partner: '马龙' },
  { year: 2013, event: '波兰公开赛', category: 'ittf-finals', type: 'singles', location: '波兰斯帕拉', opponent: '周雨', score: '4-2' },
  { year: 2013, event: '德国公开赛', category: 'ittf-finals', type: 'singles', location: '德国不来梅', opponent: '奥恰洛夫(德国)', score: '4-0' },
  { year: 2013, event: '科威特公开赛', category: 'ittf-finals', type: 'singles', location: '科威特城', opponent: '许昕', score: '4-1' },
  { year: 2013, event: '卡塔尔公开赛', category: 'ittf-finals', type: 'doubles', location: '卡塔尔多哈', opponent: '李相秀/徐贤德(韩国)', score: '3-2', partner: '许昕' },
  { year: 2013, event: '世界青少年锦标赛', category: 'youth', type: 'doubles', location: '印度海得拉巴', opponent: '林高远/徐晨皓', score: '4-2', partner: '范胜鹏' },
  
  // 补充更多公开赛冠军
  { year: 2017, event: '匈牙利公开赛', category: 'ittf-finals', type: 'doubles', location: '匈牙利布达佩斯', opponent: '弗雷塔斯/阿波罗尼亚(葡萄牙)', score: '3-0', partner: '梁靖崑' },
  { year: 2016, event: '全国锦标赛', category: 'national-championship', type: 'doubles', location: '辽宁鞍山', opponent: '-', score: '-', partner: '周雨' },
  { year: 2015, event: '全国锦标赛', category: 'national-championship', type: 'doubles', location: '黑龙江哈尔滨', opponent: '-', score: '-', partner: '许昕' },
  { year: 2015, event: '全国锦标赛', category: 'national-championship', type: 'mixed', location: '黑龙江哈尔滨', opponent: '-', score: '-', partner: '陈梦' },
  { year: 2014, event: '全锦赛', category: 'national-championship', type: 'team', location: '湖北黄石', opponent: '-', score: '-' },
  { year: 2016, event: '全锦赛', category: 'national-championship', type: 'team', location: '辽宁鞍山', opponent: '-', score: '-' },
  { year: 2020, event: '全锦赛', category: 'national-championship', type: 'team', location: '山东威海', opponent: '-', score: '-' },
  { year: 2019, event: '世界军人运动会', category: 'military-games', type: 'mixed', location: '中国武汉', opponent: '周雨/孙铭阳', score: '4-1', partner: '木子' },
  { year: 2012, event: '世界青少年锦标赛', category: 'youth', type: 'doubles', location: '印度海得拉巴', opponent: '林高远/徐晨皓', score: '4-2', partner: '范胜鹏' },
  { year: 2013, event: '南京亚青会', category: 'youth', type: 'singles', location: '中国南京', opponent: '梁靖崑', score: '4-1' },
  { year: 2014, event: '东亚运动会', category: 'ittf-finals', type: 'team', location: '中国天津', opponent: '韩国', score: '3-0' },
  { year: 2014, event: '东亚运动会', category: 'ittf-finals', type: 'singles', location: '中国天津', opponent: '闫安', score: '4-3' },
];

// 统计总数
export const totalChampions = allChampionsData.length;

// 按分类统计
export const categoryStats: Record<string, number> = {
  'olympics': allChampionsData.filter(c => c.category === 'olympics').length,
  'world-championship': allChampionsData.filter(c => c.category === 'world-championship').length,
  'world-cup': allChampionsData.filter(c => c.category === 'world-cup').length,
  'asian-games': allChampionsData.filter(c => c.category === 'asian-games').length,
  'national-games': allChampionsData.filter(c => c.category === 'national-games').length,
  'wtt-slam': allChampionsData.filter(c => c.category === 'wtt-slam').length,
  'german-cup': allChampionsData.filter(c => c.category === 'german-cup').length,
  // 添加其他分类...
};
