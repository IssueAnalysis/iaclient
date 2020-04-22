<template>
  <div class="about">
    <div v-html="txt" v-highlight></div>
  </div>
</template>
<script>
  export default {
    name: "About",
    data () {
      return {
        txt:"\"I am using Hadoop-2.10.0.<pre><code>int main(){ print(\"hello world!\");}</code></pre>\n" +
                "<br>" +
                "<br>" +
                "\n" +
                "The configuration parameter `dfs.namenode.audit.loggers` allows `default` (which is the default value) and `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`.\n" +
                "\n" +
                "\n" +
                "\n" +
                "When I use `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`, namenode will not be started successfully because of an `InstantiationException` thrown from `org.apache.hadoop.hdfs.server.namenode.FSNamesystem.initAuditLoggers`.åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "The root cause is that while initializing namenode, `initAuditLoggers` will be called and it will try to call the default constructor of `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger` which doesn't have a default constructor. Thus the `InstantiationException` exception is thrown.\n" +
                "\n" +
                "\n" +
                "\n" +
                "åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "*Symptom*\n" +
                "\n" +
                "\n" +
                "\n" +
                "*$ ./start-dfs.sh*\n" +
                "\n" +
                "{code:java}\n" +
                "\n" +
                "2019-12-18 14:05:20,670 ERROR org.apache.hadoop.hdfs.server.namenode.FSNamesystem: FSNamesystem initialization failed.java.lang.RuntimeException: java.lang.InstantiationException: org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.initAuditLoggers(FSNamesystem.java:1024)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.<init>(FSNamesystem.java:858)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.loadFromDisk(FSNamesystem.java:677)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.loadNamesystem(NameNode.java:674)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.initialize(NameNode.java:736)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.<init>(NameNode.java:961)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.<init>(NameNode.java:940)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.createNameNode(NameNode.java:1714)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.NameNode.main(NameNode.java:1782)\n" +
                "\n" +
                "Caused by: java.lang.InstantiationException: org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger\n" +
                "\n" +
                "at java.lang.Class.newInstance(Class.java:427)\n" +
                "\n" +
                "at org.apache.hadoop.hdfs.server.namenode.FSNamesystem.initAuditLoggers(FSNamesystem.java:1017)...\n" +
                "\n" +
                "8 more\n" +
                "\n" +
                "Caused by: java.lang.NoSuchMethodException: org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger.<init>()\n" +
                "\n" +
                "at java.lang.Class.getConstructor0(Class.java:3082)\n" +
                "\n" +
                "at java.lang.Class.newInstance(Class.java:412)\n" +
                "\n" +
                "... 9 more{code}\n" +
                "\n" +
                "åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "*Detailed Root Cause*\n" +
                "\n" +
                "\n" +
                "\n" +
                "There is no default constructor in `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`:åÊ\n" +
                "\n" +
                "{code:java}\n" +
                "\n" +
                "/** \n" +
                "\n" +
                " * An {@link AuditLogger} that sends logged data directly to the metrics \n" +
                "\n" +
                " * systems. It is used when the top service is used directly by the name node \n" +
                "\n" +
                " */ \n" +
                "\n" +
                "@InterfaceAudience.Private \n" +
                "\n" +
                "public class TopAuditLogger implements AuditLogger {     \n" +
                "\n" +
                "  public static finalLogger LOG = LoggerFactory.getLogger(TopAuditLogger.class); \n" +
                "\n" +
                "\n" +
                "\n" +
                "  private final TopMetrics topMetrics; \n" +
                "\n" +
                "\n" +
                "\n" +
                "  public TopAuditLogger(TopMetrics topMetrics) {\n" +
                "\n" +
                "    Preconditions.checkNotNull(topMetrics, \"Cannot init with a null \" + \n" +
                "\n" +
                "        \"TopMetrics\");\n" +
                "\n" +
                "    this.topMetrics = topMetrics; \n" +
                "\n" +
                "  }\n" +
                "\n" +
                "\n" +
                "\n" +
                "  @Override\n" +
                "\n" +
                "  public void initialize(Configuration conf) { \n" +
                "\n" +
                "  }\n" +
                "\n" +
                "{code}\n" +
                "\n" +
                "As long as the configuration parameter `dfs.namenode.audit.loggers` is set to `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`, `initAuditLoggers` will try to call its default constructor to make a new instance:åÊ\n" +
                "\n" +
                "{code:java}\n" +
                "\n" +
                "private List<AuditLogger> initAuditLoggers(Configuration conf) {\n" +
                "\n" +
                "åÊ // Initialize the custom access loggers if configured.\n" +
                "\n" +
                "åÊ Collection<String> alClasses =\n" +
                "\n" +
                "åÊ åÊ åÊ conf.getTrimmedStringCollection(DFS_NAMENODE_AUDIT_LOGGERS_KEY);\n" +
                "\n" +
                "åÊ List<AuditLogger> auditLoggers = Lists.newArrayList();\n" +
                "\n" +
                "åÊ if (alClasses != null && !alClasses.isEmpty()) {\n" +
                "\n" +
                "åÊ åÊ for (String className : alClasses) {\n" +
                "\n" +
                "åÊ åÊ åÊ try {\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ AuditLogger logger;\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ if (DFS_NAMENODE_DEFAULT_AUDIT_LOGGER_NAME.equals(className)) {\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ åÊ logger = new DefaultAuditLogger();\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ } else {\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ åÊ logger = (AuditLogger) Class.forName(className).newInstance();\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ }\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ logger.initialize(conf);\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ auditLoggers.add(logger);\n" +
                "\n" +
                "åÊ åÊ åÊ } catch (RuntimeException re) {\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ throw re;\n" +
                "\n" +
                "åÊ åÊ åÊ } catch (Exception e) {\n" +
                "\n" +
                "åÊ åÊ åÊ åÊ throw new RuntimeException(e);\n" +
                "\n" +
                "åÊ åÊ åÊ }\n" +
                "\n" +
                "åÊ åÊ }\n" +
                "\n" +
                "åÊ }\n" +
                "\n" +
                "{code}\n" +
                "\n" +
                "`initAuditLoggers` tries to call the default constructor to make a new instance in:\n" +
                "\n" +
                "{code:java}\n" +
                "\n" +
                "logger = (AuditLogger) Class.forName(className).newInstance();\n" +
                "\n" +
                "{code}\n" +
                "\n" +
                "This is very different from the default configuration, `default`, which implements a default constructor so the default is fine.\n" +
                "\n" +
                "\n" +
                "\n" +
                "åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "*How To Reproduce*åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "The version of Hadoop: 2.10.0\n" +
                "\n" +
                " # Set the value of configuration parameter `dfs.namenode.audit.loggers` to `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger` in \"hdfs-site.xml\"(the default value is `default`)\n" +
                "\n" +
                " # Start the namenode by running \"start-dfs.sh\"\n" +
                "\n" +
                " # The namenode will not be started successfully.\n" +
                "\n" +
                "\n" +
                "\n" +
                "{code:java}\n" +
                "\n" +
                "<property>\n" +
                "\n" +
                "åÊåÊ<name>dfs.namenode.audit.loggers</name>\n" +
                "\n" +
                "åÊåÊ<value>org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger</value>\n" +
                "\n" +
                "åÊåÊ<description>\n" +
                "\n" +
                "åÊåÊåÊåÊList of classes implementing audit loggers that will receive audit events.\n" +
                "\n" +
                "åÊåÊåÊåÊThese should be implementations of org.apache.hadoop.hdfs.server.namenode.AuditLogger.\n" +
                "\n" +
                "åÊåÊåÊåÊThe special value \"default\" can be used to reference the default audit\n" +
                "\n" +
                "åÊåÊåÊåÊlogger, which uses the configured log system. Installing custom audit loggers\n" +
                "\n" +
                "åÊåÊåÊåÊmay affect the performance and stability of the NameNode. Refer to the custom\n" +
                "\n" +
                "åÊåÊåÊåÊlogger's documentation for more details.\n" +
                "\n" +
                "åÊåÊ</description>\n" +
                "\n" +
                "</property>\n" +
                "\n" +
                "{code}\n" +
                "\n" +
                "åÊ\n" +
                "\n" +
                "\n" +
                "\n" +
                "*How To Fix*\n" +
                "\n" +
                "\n" +
                "\n" +
                "Add a default constructor for `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`.\n" +
                "\n" +
                "\n" +
                "\n" +
                "I wrote a patch to add a default constructor foråÊTopAuditLogger.\""
      }
    },
    created() {
      // hljs.initHighlightingOnLoad()
    },
  }
</script>
